const Product = require("../models/Product");
const {IncomingForm} = require("formidable");
const {errorsObject, updateProductPhotos} = require("../helpers/validators");

exports.getProducts = (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "desc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 50; 

    let query = {};

    if(req.query.category)
        query.category = req.query.category;

    if(req.query.name)
        query.name = {$regex: req.query.name, "$options": 'i'};

    Product.find(query)
           .populate("category") 
           .select({photo1: 0, photo2: 0, photo3: 0, photo4: 0, photo5: 0})
           .sort([[sortBy, order]])
           .limit(limit)
           .exec((err, products) => err ? res.status(400).json(err) : res.json(products))
}

exports.getProduct = (req, res) => {
    req.body.product.photo1 = undefined;
    req.body.product.photo2 = undefined;
    req.body.product.photo3 = undefined;
    req.body.product.photo4 = undefined;
    req.body.product.photo5 = undefined;
    res.json(req.body.product);
}

exports.photoProduct = (req, res) => {
    let num = req.query.num ? parseInt(req.query.num) : 1;
    let {data, contentType} = req.body.product[`photo${num}`];
    res.set("Content-Type", contentType);
    return res.send(data);
}

exports.filterProducts = (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";  
    const orderBy = req.query.orderBy ? req.query.orderBy : "asc";  
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;  
    const skip = parseInt(req.query.skip);

    const findArgs = {};
    if(req.body.filters)
        for(let filter in req.body.filters)
            if(filter === "price")
                findArgs[filter] = {$gte: req.body.filters[filter][0], $lte: req.body.filters[filter][1]};
            else
                findArgs[filter] = req.body.filters[filter];

    Product.find(findArgs)
           .populate("category")
           .select({photo1: 0, photo2: 0, photo3: 0, photo4: 0, photo5: 0})
           .sort([[sortBy , orderBy]])
           .limit(limit)
           .skip(skip)
           .exec((err, Products) => err ? res.status(404).json("Products Not Founded") : res.json(Products))
}

exports.relatedProducts = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 4; 

    Product.find({category: {$eq: req.body.product.category}, _id: {$ne: req.body.product._id}})
           .select({photo1: 0, photo2: 0, photo3: 0, photo4: 0, photo5: 0})
           .limit(limit)
           .populate("category" , "_id name")
           .exec((err, Products) => err ? res.status(404).json("Products Not Founded") : res.json(Products))
}

exports.postProduct = (req, res) => {
    const form = new IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err)
            return res.status(400).json(err);

        let newProduct = new Product(fields);
        updateProductPhotos(newProduct, files, 5);
         
        newProduct.save()
            .then(prod => res.json(prod))
            .catch(err => {
                if(err.errors)
                    res.status(400).json(errorsObject(err));
                else
                    res.status(400).json({errors: "Please Change Name !!"});
            })
      });
}

exports.updateProduct = (req, res) => {
    const product = req.body.product;

    Product.findById(product._id)
           .then(pro => {
                const form = new IncomingForm();
                form.parse(req, (err, fields, files) => {
                    if(err)
                        return res.status(400).json(err);

                    for(atr in fields)
                        pro[atr] = fields[atr];

                    updateProductPhotos(pro, files, 5);
                    pro.save()
                        .then(prod => res.json(prod))
                        .catch(err => {
                            if(err.errors)
                                res.status(400).json(errorsObject(err));
                            else
                                res.status(400).json({errors: "Please Change Name !!"});
                        })
                });

           })
           .catch(err => res.status(404).json(err))
}

exports.deleteProduct = (req, res) => {
    const product = req.body.product;

    Product.deleteOne({_id: product._id})
           .then(() => res.json("Deleted Successfully"))
           .catch(err => res.status(400).json(err))
}
