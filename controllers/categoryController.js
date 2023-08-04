const Category = require("../models/Category");
const {errorsObject} = require("../helpers/validators");

exports.getCategories = (req, res) => {
    Category.find()
            .then(categories => res.json(categories))
            .catch(err => res.status(400).json(err))
}

exports.getCategory = (req, res) => {
    res.json(req.body.category);
}

exports.postCategory = (req, res) => {
    const newCategory = new Category(req.body);

    newCategory.save()
            .then(category => res.json(category))
            .catch(err => {                
                if(err.errors)
                    res.status(400).json(errorsObject(err));
                else
                    res.status(400).json({errors: "Please Change Name !!"});
            })
}

exports.updateCategory = (req, res) => {
    const category = req.body.category;
    
    Category.findById(category._id)
            .then(_category => {
                _category.name = req.body.name;
                _category.save()
                    .then(cat => res.json(cat))
                    .catch(err => {                
                        if(err.errors)
                            res.status(400).json(errorsObject(err));
                        else
                            res.status(400).json({errors: "Please Change Name !!"});
                    })
            })
            .catch(err => res.status(404).json(err))   
}

exports.deleteCategory = (req, res) => {
    const category = req.body.category;

    Category.deleteOne(category)
            .then(() => res.json("Deleted Successfully"))
            .catch(err => res.status(400).json(err))
}
