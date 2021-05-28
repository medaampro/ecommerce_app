const User = require('../models/User');
const { userValidation } = require('../helpers/validators');
const jwt = require('jsonwebtoken');

/********************* Signup **************************/
exports.signup = (req, res) => {
    const { error, value } = userValidation(req.body);
    if(error){
        res.status(400).json({errors: error.details[0].message});
    }else {
        const user = new User(value);
        user.save()
            .then(x => {
                x.salt = undefined;
                x.hashed_password = undefined;
                res.json({user: x});
            })
            .catch(err => {                
                if(err.errors){
                    let errors = {};
                    for (i in err.errors){
                        errors[i] = err.errors[i].message;
                    }
                    res.status(400).json({errors});
                }else {
                    res.status(400).json({errors: 'Please Change Email !!'});
                }
            })
    }
}

/********************* Signin **************************/
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            res.status(404).json({errors: "Incorrect Email, Please Signup !!"});
        }
        else if(!user.authenticate(password)){
            res.status(404).json({errors: "Incorrect Password, Please Signup !!"});
        }
        else{

            const token = jwt.sign({ _id: user._id , role: user.role } , process.env.JWT_SECRET );
            res.cookie('token', token, { expire: new Date() + 900000000 });
            
            res.json({ token, user : { _id: user._id , name: user.name , email: user.email , role: user.role } });

        }
    })

}

/********************* Signout **************************/
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json('User Signout');
}

