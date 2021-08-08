const App = require('../models/App');
const { IncomingForm } = require('formidable');
const fs = require('fs');


/********************* getLogo **************************/
exports.getLogo = (req, res) => {

    App.find()
       .then(z => {       
            let x = z[0];
            res.set('Content-Type', x.logo.contentType);
            return res.send(x.logo.data);
       })
       .catch(err => res.status(404).json(err))
  
}


/********************* updateLogo **************************/
exports.updateLogo = (req, res) => {

    App.find()
       .then(z => {

            let x = z[0];

            const form = new IncomingForm();
            form.keepExtensions = true;

            form.parse(req, (err, fields, files) => {
                if(err){
                    return res.status(400).json({errors: err});
                }else{

                    if(files[`logo`]){
                        if(files[`logo`].size > Math.pow(10,6)){  
                            return res.status(400).json({errors: "Image Should Be less than 1mb"});            
                        }
                        x[`logo`].data = fs.readFileSync(files[`logo`].path);
                        x[`logo`].contentType = files[`logo`].type;
                    }

                        x.save()
                            .then(z => res.json(z))
                            .catch(error => res.json({errors: error}))
                }
            });


       })
       .catch(err => res.status(404).json(err))
  
}
