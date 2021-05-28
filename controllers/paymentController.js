const braintree = require("braintree");
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.merchantId,
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
  });

/********************* getToken **************************/
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err || !response){
            return res.status(400).json("Can't Generate clientToken");
        }else{
            return res.json(response.clientToken);
        }   
    });
}

/********************* createTransaction **************************/
exports.createTransaction = (req, res) => {
    const { amount, paymentMethodNonce } = req.body;
    gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true
        }
      }, (err, response) => {
            if(err || !response){
                return res.status(400).json("Failed transaction");
            }else{
                return res.json(response);         
            }
      });
}