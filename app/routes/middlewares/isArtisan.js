const userTypeHelper = require('../../../helpers/userTypes');

module.exports = function isArtisan(){
    return function (req,res,next){
        if (req.payLoad.userTypeId == userTypeHelper.artisan){
            next();
        }else{
            res.withClientError(403).reply();
        }

    }
}