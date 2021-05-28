const User = require('../models/User');
const { userValidation } = require('../helpers/validators');

/********************* getUsers **************************/
exports.getUsers = (req, res) => {
    User.find()
        .then(x => {

            for(let i=0; i< x.length;i++ ) {
                x[i].salt = undefined;
                x[i].hashed_password = undefined;
            }

            res.json(x);
        })
        .catch(err => res.status(400).json(err))
}

/********************* getUser **************************/
exports.getUser = (req, res) => {
    req.body.profile.salt = undefined;
    req.body.profile.hashed_password = undefined;
    res.json(req.body.profile);
}

/********************* updateUser **************************/
exports.updateUser = (req, res) => {
    const { name, email, password, profile } = req.body;
    const { error, value } = userValidation({ name, email, password });

    if(error){
        res.status(400).json(error.details[0].message);
    }else{
        User.findById(profile._id)
            .then(user => {

                user.name = value.name;
                user.email = value.email;
                user.password = value.password;

                user.save()
                    .then(x => {
                        x.salt = undefined;
                        x.hashed_password = undefined;
                        res.json(x);
                    })
                    .catch(() => res.status(400).json('Please Change Email !!'))


            } )
            .catch(error => res.status(404).json(error))
    }
}

/********************* deleteUser **************************/
exports.deleteUser = (req, res) => {
    User.deleteOne(req.body.profile)
        .then(() => res.json('Deleted Successfully'))
        .catch(err => res.status(400).json(err))
}

