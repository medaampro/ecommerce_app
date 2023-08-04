const Category = require("../models/Category");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id)
            .then(category => {
                req.body.category = category;
                next();
            })
            .catch(() => res.status(404).json("Category Not founded"))
}
