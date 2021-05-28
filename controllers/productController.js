const Product = require('../models/Product');
const { IncomingForm } = require('formidable');
const fs = require('fs');

/********************* getProducts **************************/
exports.getProducts = (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : 'desc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 50; 

    let query = {};

    if(req.query.category){
        query.category = req.query.category;
    }
    if(req.query.name){
        query.name = { $regex: req.query.name, '$options': 'i' };
    }

    Product.find(query)
           .populate("category") 
           .select({photo: 0})
           .sort([[sortBy, order]])
           .limit(limit)
           .exec( (err, products) => err ? res.status(400).json(err) : res.json(products) )

}

/********************* getProduct **************************/
exports.getProduct = (req, res) => {
    req.body.product.photo = undefined;
    res.json(req.body.product);
}

/********************* getProduct Picture **************************/
exports.photoProduct = (req , res) => {
    const { data, contentType } = req.body.product.photo;
    res.set('Content-Type', contentType);
    return res.send(data);
}

/********************* filterProducts **************************/
exports.filterProducts = (req,res) => {

    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';  
    const orderBy = req.query.orderBy ? req.query.orderBy : 'asc';  
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;  
    const skip = parseInt(req.query.skip);

    const findArgs = {};
    
    if(req.body.filters){
        for(let k in req.body.filters){
            if(k === 'price'){
                findArgs[k] = {
                    $gte: req.body.filters[k][0],
                    $lte: req.body.filters[k][1]
                }
            }
            else{
                findArgs[k] = req.body.filters[k];
            }
        }
    }

    Product.find(findArgs)
           .populate("category")
           .select({photo: 0})
           .sort([[sortBy , orderBy]])
           .limit(limit)
           .skip(skip)
           .exec((err, Products) => err ? res.status(404).json('Products Not Founded') : res.json(Products) )
}

/********************* relatedProducts **************************/
exports.relatedProducts = (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 4; 

    Product.find({ category: { $eq: req.body.product.category }, _id: { $ne: req.body.product._id } })
           .select({photo: 0})
           .limit(limit)
           .populate("category" , "_id name")
           .exec((err, Products) => err ? res.status(404).json('Products Not Founded') : res.json(Products) )
    
}

/********************* postProduct **************************/
exports.postProduct = (req, res) => {
    const form = new IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json(err);
        }else{
            let newProduct = new Product(fields);
            if(files.photo){
                if(files.photo.size > Math.pow(10,6)){  
                    return res.status(400).json({error: "Image Should Be less than 1mb"});            
                }
                newProduct.photo.data = fs.readFileSync(files.photo.path);
                newProduct.photo.contentType = files.photo.type;
            }
            newProduct.save()
                        .then(x => res.json(x))
                        .catch(err => {                
                            if(err.errors){
                                let errors = {};
                                for (i in err.errors){
                                    errors[i] = err.errors[i].message;
                                }
                                res.status(400).json({errors});
                            }else {
                                res.status(400).json({errors: 'Please Change Name !!'});
                            }
                        })
            }
      });    
}

/********************* updateProduct **************************/
exports.updateProduct = (req, res) => {
    const product = req.body.product;

    Product.findById(product._id)
           .then(x => {
                const form = new IncomingForm();

                form.parse(req, (err, fields, files) => {
                    if(err){
                        return res.status(400).json(err);
                    }else{                
                        for(i in fields){
                            x[i] = fields[i];
                            i++;
                        }
                        if(files.photo){
                            if(files.photo.size > Math.pow(10,6)){  
                                return res.status(400).json({error: "Image Should Be less than 1mb"});            
                            }
                            x.photo.data = fs.readFileSync(files.photo.path);
                            x.photo.contentType = files.photo.type;
                        }
                        x.save()
                            .then(z => res.json(z))
                            .catch(err => {
                                if(err.errors){
                                    let errors = {}
                                    for(i in err.errors){
                                        errors[i] = err.errors[i].message;
                                    }
                                    res.status(400).json(errors);
                                }else{
                                    res.status(400).json('Please Change Name');
                                }
                            })
                        }
                });   
           })
           .catch(err => res.status(404).json(err))
}

/********************* deleteProduct **************************/
exports.deleteProduct = (req, res) => {
    const product = req.body.product;

    Product.deleteOne(product)
           .then(() => res.json('Deleted Successfully'))
           .catch(err => res.status(400).json(err))
}
