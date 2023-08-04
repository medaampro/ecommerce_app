const Product = require("../models/Product");

exports.productById = async (req, res, next, id) => {
    Product.findById(id)
           .populate("category")
           .exec((err, product) => {
                if(err || !product)
                    return res.status(404).json("Product Not Founded !!");

                req.body.product = product;
                next();
            })
}

exports.stockManagement = (req, res, next) => {
    const {products} = req.body;
    
    products.forEach(pro => {
        Product.findById(pro.product)
               .then(pr => {
                    pr.sold += pro.count;
                    pr.quantity -= pro.count;
                    pr.save();
               })
               .then(() => next())
               .catch(err => res.status(400).json(err))
    });

}
