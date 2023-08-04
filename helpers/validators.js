const JOI = require("joi");
const {IncomingForm} = require("formidable");
const fs = require("fs");

exports.userValidation = (user) => {
    const schema = JOI.object(
    {
        name: JOI.string().alphanum().min(3).max(30).required(),
        email: JOI.string().email().min(5).max(50).required(),
        password: JOI.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required()
    });

    return schema.validate(user);
}

exports.errorsObject = (err) => {
    let errors = {};

    for (error in err.errors)
        errors[error] = err.errors[error].message;

    return errors;
}

exports.updateProductPhotos = (product, files, nbrOfphotos) => {
    for(let i = 1; i <=  nbrOfphotos; i++)
        if(files[`photo${i}`])
        {
            if(files[`photo${i}`].size > Math.pow(10,6))
                return res.status(400).json({errors: "Image Should Be less than 1 Mbs"});
            
            product[`photo${i}`].data = fs.readFileSync(files[`photo${i}`].path);
            product[`photo${i}`].contentType = files[`photo${i}`].type;
        }

    return;
}
