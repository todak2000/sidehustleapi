let fs            = require("fs");
let jwt           = require('jsonwebtoken');

module.exports = function isLoggedIn(){
  return function (req,res,next){
      //Get Token


      try{
          let authHeader = req.get('Authorization').split(" ");
          //make sure the user uses the right authentication type




          let token     = authHeader[1];
          let cert      = fs.readFileSync('jwt_pk.key','utf8');  // get public key


          jwt.verify(token, cert, { algorithms: ['RS256'] }, function(err, decoded) {

              if (err){
                  res.withClientError(403).withErrorData(err).reply();
              }else{

                  req.payLoad = decoded;
                  //Make sure it is a login JWT
                  if (req.payLoad.userId){
                      next();
                  }else{
                      res.withClientError(401).reply();
                  }
              }

          });
      }catch (e) {
          console.log(e)
          res.withClientError(500).reply();
      }



  }
}