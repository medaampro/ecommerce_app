const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway(
{
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.merchantId,
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
});

exports.getToken = (req, res) => 
{
    gateway.clientToken.generate({}, (err, response) => 
    {
        if(err || !response)
            return res.status(400).json("Can't Generate clientToken");

        res.json(response.clientToken);
    });
}

exports.createTransaction = (req, res) => 
{
    const {amount, paymentMethodNonce} = req.body;
    gateway.transaction.sale(
    {
        amount,
        paymentMethodNonce,
        options: {submitForSettlement: true}
    }, 
    (err, response) => 
    {
        if(err || !response)
            return res.status(400).json("Failed transaction");
        res.json(response);         
    });
}

