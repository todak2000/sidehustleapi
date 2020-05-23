let fs            = require("fs");
let jwt           = require('jsonwebtoken');

module.exports = function isLoggedIn(){
    return function (req,res,next){
       req.body.transaction_number = req.body.transactionReference;
       req.body.reference_number   = req.body.paymentReference
        next();
    }
}