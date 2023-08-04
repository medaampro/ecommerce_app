const Order = require("../models/Order");
const {errorsObject} = require("../helpers/validators");

exports.getOrders = (req, res) => {
    Order.find()
         .populate("user")
         .sort("-createdAt")
         .then(x => res.json(x))
         .catch(err => res.status(400).json(err))
}

exports.postOrder = (req, res) => {
    req.body = {...req.body, user: req.body.profile};

    const newOrder = new Order(req.body);

    newOrder.save()
            .then(order => res.json(order))
            .catch(err => {
                if(err.errors)
                    res.status(400).json(errorsObject(err));
                else
                    res.status(400).json("Please Change Primary key");
            })
}

exports.getStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req, res) => {
    const {order} = req.body;

    Order.updateOne({_id: order._id}, {status: req.body.status})
         .exec((err, result) => {
             if(err || !result)
                 return res.status(400).json("Order Not Updated");

             res.json(result);
         })
}
