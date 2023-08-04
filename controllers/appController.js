const App = require("../models/App");
const {IncomingForm} = require("formidable");
const fs = require("fs");

exports.readLogo = (req, res) => {
    App.findOne()
       .then(_logo => {
            if(!_logo) return res.json({});

            res.set("Content-Type", _logo.logo.contentType);
            return res.send(_logo.logo.data);
       })
       .catch(err => res.status(404).json(err))
}

exports.writeLogo = async (req, res) => {
    await App.deleteMany();

    const form = new IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err)
            return res.status(400).json(err);

        let newApp = new App(fields);

        if(files["logo"])
        {
            if(files["logo"].size > Math.pow(10,6))
                return res.status(400).json({errors: "Image Should Be less than 1 Mbs"});

            newApp["logo"].data = fs.readFileSync(files["logo"].path);
            newApp["logo"].contentType = files["logo"].type;
        }

        newApp.save()
            .then(rapp => res.json(rapp))
            .catch(err => res.status(404).json(err))
      });    
}

