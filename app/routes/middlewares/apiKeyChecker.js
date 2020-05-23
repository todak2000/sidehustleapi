const keyRepository = require('../../repositories/key');
const companyRepository = require('../../repositories/company');
const walletRepository = require('../../repositories/wallet');
const getKeys           =   require('../../../helpers/gatewayKeys');
const atob              =   require('atob');
const jwt               =   require('jsonwebtoken');
const keyTypeHelper     =   require('../../../helpers/keyTypes');


module.exports = function apiKeyChecker(){
  return async function (req,res,next){
      try{
          let key;
          let token;
          let getKey;
          let getToken;
          let authHeader = [];
          req.payLoad = {
              ...req.payLoad
          };

          if (req.get('Authorization')){

               authHeader = req.get('Authorization').split(" ");
          }


          if (req.params.api_key){
              key = req.params.api_key;
          }else if(req.query.api_key){
              key = req.query.api_key;
          }
          else if(req.body.api_key){
              key = req.body.api_key;
              //Note that this function doesn't check the validity of the tokens
          }else if (authHeader[0] == "Basic"){

              key   = atob(authHeader[1]).split(':')[0];
              token = atob(authHeader[1]).split(':')[1];


          }else if(authHeader[0] == "Bearer"){
              let cert      = fs.readFileSync('jwt_pubk.key','utf8');  // get public key
              let data =  jwt.verify(authHeader[1], cert, { algorithms: ['RS256'] });
              key   = data.apiKey;
              token = data.apiToken
          }

          //apikey should be sent with every request in whatever format.
          if (key){
              if (key.split('-')[0] === "test"){
                  getKey =  await keyRepository.setModel("test").findOne({
                      where: {
                          key,
                          key_type_id: keyTypeHelper.key//make sure the use is using the api key
                      },
                      include: [
                          {
                              model: companyRepository.model,
                              nested:true,
                              include:[
                                  {
                                      model:walletRepository.setModel("test").model
                                  }
                              ]
                          },
                      ],
                      nested:true
                  });
                  req.keyType = "test";
                  if (getKey){
                      req.payLoad.walletTag = getKey.Company.test_Wallet.tag;
                      req.payLoad.walletId  = getKey.Company.test_Wallet.id;
                      req.payLoad.companyId = getKey.Company.id

                  }
              }else{
                  getKey =  await keyRepository.findOne({
                      where:{
                          key
                      },
                      include: [
                          {
                              model: companyRepository.model,
                              nested:true,
                              include:[
                                  {
                                      model:walletRepository.model
                                  }
                              ]
                          },
                      ],
                      nested:true
                  });

                  req.keyType = "live";

                  if (getKey){
                      req.payLoad.walletTag = getKey.Company.Wallet.tag;
                      req.payLoad.walletId  = getKey.Company.Wallet.id;
                      req.payLoad.companyId = getKey.Company.id
                  }
              }
          }else{
              return res.withClientError(403).reply();
          }

          if (getKey){

              //if it is bearer or basic token, confirm the token before granting permission
              if (req.get('Authorization')){

                  getToken = await keyRepository.setModel(req.keyType).findOne({
                      where:{
                          key:token,
                          company_id:getKey.company_id,
                          key_type_id:keyTypeHelper.token
                      }

                  });

                  if (getToken===null){
                      return res.withClientError(403).reply();
                  }

              }

              next()
          }else{
              return  res.withClientError(403).reply();
          }

      }catch (e) {
          console.log(e);
         return  res.withServerError(500).reply();
      }

  }
};