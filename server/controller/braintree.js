var braintree = require("braintree");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:"kyvthzhcddhb45vf",// process.env.BRAINTREE_MERCHANT_ID,
  publicKey: "22vmh2nswsrwkm9x",//process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: "5fab9126d27afa0f9b1b5dbd03261894"// process.env.BRAINTREE_PRIVATE_KEY,
});

class brainTree {
  ganerateToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.json(err);
      }
      return res.json(response);
    });
  }

  paymentProcess(req, res) {
    let { amountTotal, paymentMethod } = req.body;
    gateway.transaction.sale(
      {
        amount: amountTotal,
        paymentMethodNonce: paymentMethod,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.json(err);
        }

        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          return res.json(result);
        } else {
          console.error(result.message);
        }
      }
    );
  }
}

const brainTreeController = new brainTree();
module.exports = brainTreeController;
