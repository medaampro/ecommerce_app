const User = require('../models/User');

/********************* sendUserInRequest **************************/
exports.userById = (req, res, next, id) => {
    User.findById(id, (err, profile) => {
        if(err || !profile){
            res.status(404).json('User Not Founded');
        }else{
            req.body.profile = profile;
            next();
        }
    })
}

/********************* AddPurchaseToUserHistory **************************/
exports.AddPurchaseToUserHistory = (req, res, next) => {
    const { profile, products } = req.body;
    let amount = 0;
    let items = [];
    transaction_id = req.body.transaction_id;
    products.forEach(x => {
        amount += x.price * x.count;
        items.unshift(x.name);
    });
    profile.history.unshift( {transaction_id: transaction_id, Total: amount, Products: items} ); 

    profile.save()
           .then(() => next())
           .catch(err => res.status(400).json(err))
}