let fs            = require("fs");
let jwt           = require('jsonwebtoken');

module.exports = function isLoggedIn(){
    return function (req,res,next){
        //Get Token
        try{



        }catch (e) {
            res.withServerError(500).withErrorData().reply();
        }



    }
}