const JOI = require('joi');

/********************* userValidation **************************/
exports.userValidation = (user) => {
    
    const schema = JOI.object({
        name: JOI.string().alphanum().min(3).max(30).required(),
        email: JOI.string().email().min(5).max(50).required(),
        password: JOI.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
    })

    return schema.validate(user);

}