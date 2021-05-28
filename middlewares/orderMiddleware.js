const Order = require('../models/Order');

/********************* sendOrderInRequest **************************/
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
         .exec( (err, order) => {
            if(err || !order){
                return res.status(404).json('Order Not Founded');
            }else{
                req.body.order = order;
                next();
            }
        })
}