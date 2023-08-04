const User = require("../models/User");
const {userValidation, errorsObject} = require("../helpers/validators");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const {error, value} = userValidation(req.body);

    if(error)
        return res.status(400).json({errors: error.details[0].message});

    const user = new User(value);
    user.save()
        .then(_user => {
            _user.salt = undefined;
            _user.hashed_password = undefined;
            res.json({user: _user});
        })
        .catch(err => {                
            if(err.errors)
                res.status(400).json(errorsObject(err));
            else
                res.status(400).json({errors: "Please Change Email !!"});
        })
}

exports.signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (err, user) => {
        if(err || !user)
            return res.status(404).json({errors: "Incorrect Email, Please Signup !!"});

        else if(!user.authenticate(password))
            return res.status(404).json({errors: "Incorrect Password, Please Signup !!"});

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);
        res.cookie("token", token, {expire: new Date() + 900000000});
        res.json({token, user: {_id: user._id, name: user.name, email: user.email, role: user.role}});
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json("User Signout");
}
