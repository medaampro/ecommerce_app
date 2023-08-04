const User = require("../models/User");
const {userValidation} = require("../helpers/validators");

exports.getUsers = (req, res) => {
    User.find()
        .then(users => {
            for(let i = 0; i < users.length;i++ ) 
            {
                users[i].salt = undefined;
                users[i].hashed_password = undefined;
            }
            res.json(users);
        })
        .catch(err => res.status(400).json(err))
}

exports.getUser = (req, res) => {
    req.body.profile.salt = undefined;
    req.body.profile.hashed_password = undefined;
    res.json(req.body.profile);
}

exports.updateUser = (req, res) => {
    const {name, email, password, profile} = req.body;
    const {error, value} = userValidation({name, email, password});

    if(error)
        return res.status(400).json(error.details[0].message);

    User.findById(profile._id)
        .then(user => {
            user.name = value.name;
            user.email = value.email;
            user.password = value.password;

            user.save()
                .then(_user => {
                    _user.salt = undefined;
                    _user.hashed_password = undefined;
                    res.json(_user);
                })
                .catch(() => res.status(400).json("Please Change Email !!"))

        })
        .catch(error => res.status(404).json(error))
}

exports.deleteUser = (req, res) => {
    User.deleteOne(req.body.profile)
        .then(() => res.json("Deleted Successfully"))
        .catch(err => res.status(400).json(err))
}
