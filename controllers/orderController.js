const Order = require('../models/Order');

/********************* getOrders **************************/
exports.getOrders = (req, res) => {
    Order.find()
         .populate("user")
        //  .populate({path: "products", populate: {path: "product", select: "-photo" } })
         .sort("-createdAt")
         .then(x => res.json(x))
         .catch(err => res.status(400).json(err))
}

/********************* postOrder **************************/
exports.postOrder = (req, res) => {
    req.body = { ...req.body, user: req.body.profile }
    const newOrder = new Order(req.body);

    newOrder.save()
            .then(x => res.json(x))
            .catch(err => {
                if(err.errors){
                    let errors = {}
                    for(i in err.errors){
                        errors[i] = err.errors[i].message;
                    }
                    res.status(400).json(errors);
                }else{
                    res.status(400).json('Please Change Primary key');
                }
            })
}

/********************* getStatus **************************/
exports.getStatus = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

/********************* updateStatus **************************/
exports.updateStatus = (req, res) => {
    const { order } = req.body;

    Order.updateOne({_id: order._id}, {status: req.body.status})
         .exec( (err, result) => {
             if(err || !result){
                 return res.status(400).json('Order Not Updated');
             }else{
                 return res.json(result);
             }
         })
}