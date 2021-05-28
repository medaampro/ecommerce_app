const Product = require('../models/Product');

/********************* sendProductInRequest **************************/
exports.productById = (req, res, next, id) => {
    Product.findById(id)
           .populate("category")
           .exec((err, product) => {
                if(err || !product){
                    return res.status(404).json('Product Not Founded !!')
                }else {
                    req.body.product = product;
                    next();
                }
            })
}

/********************* stockManagement **************************/
exports.stockManagement = (req, res, next) => {
    const { products } = req.body;
    
    products.forEach(x => {
        Product.findById(x.product)
               .then(z => {
                    z.sold = z.sold + x.count;
                    z.quantity = z.quantity - x.count;
                    z.save();
               })
               .catch(err => res.status(400).json(err))
    });

    next();
}