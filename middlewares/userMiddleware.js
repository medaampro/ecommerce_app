const User = require("../models/User");

exports.userById = (req, res, next, id) => {
    User.findById(id, (err, profile) => {
        if(err || !profile)
            return res.status(404).json("User Not Founded");

        req.body.profile = profile;
        next();
    })
}

exports.AddPurchaseToUserHistory = (req, res, next) => {
    const {profile, products} = req.body;
    const transaction_id = req.body.transaction_id;

    let amount = 0;
    let items = [];

    products.forEach(product => {
        amount += product.price * product.count;
        items.push(product.name);
    });

    profile.history.push({transaction_id: transaction_id, total: amount, products: items});

    profile.save()
           .then(() => {})
           .catch(err => res.status(400).json(err))

    next();
}
