const Category = require('../models/Category');

/********************* getCategories **************************/
exports.getCategories = (req, res) => {
    Category.find()
            .then(x => res.json(x))
            .catch(err => res.status(400).json(err))
}

/********************* getCategory **************************/
exports.getCategory = (req, res) => {
    res.json(req.body.category);
}

/********************* postCategory **************************/
exports.postCategory = (req, res) => {
    const newCategory = new Category(req.body);

    newCategory.save()
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

/********************* updateCategory **************************/
exports.updateCategory = (req, res) => {
    const category = req.body.category;
    
    Category.findById(category._id)
            .then(x => {
                x.name = req.body.name;
                x.save()
                    .then(cat => res.json(cat))
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
                
            })
            .catch(err => res.status(404).json(err))   
}

/********************* deleteCategory **************************/
exports.deleteCategory = (req, res) => {
    const category = req.body.category;

    Category.deleteOne(category)
            .then(() => res.json('Deleted Successfully'))
            .catch(err => res.status(400).json(err))
}

