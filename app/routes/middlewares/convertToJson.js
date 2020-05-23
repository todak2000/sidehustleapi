let fs            = require("fs");
let jwt           = require('jsonwebtoken');

module.exports = function isLoggedIn(){
    return function (req,res,next){
        req.body = JSON.parse(req.body);
        next();
    }
}