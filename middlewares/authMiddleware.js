const expressJWT = require('express-jwt');

/********************* tokenIsRequired **************************/
exports.requireSignIn = expressJWT({secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'auth'});

/********************* authentificated **************************/
exports.isAuth = (req, res, next) => {
    if( req.auth && req.body.profile && (req.auth._id != req.body.profile._id) ) {
        return res.status(400).json('Acces Denied');
    }else{
        return next();
    }
}

/********************* isAdmin **************************/
exports.isAdmin = (req, res, next) => {
    if( req.auth && req.auth.role == 0 ) {
        return res.status(400).json('Acces Denied, Admin Ressources');
    }else{
        return next();
    }
}