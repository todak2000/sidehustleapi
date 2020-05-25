const repo = require('../repositories/category');

module.exports = class Category{
    static async list(req,res){
        try{
            let userTypes = await repo.findAll();
            if(userTypes){
                return res.withSuccess(200).withData(userTypes).reply();
            }
            return res.withClientError(404).reply();

        }catch(e){
            console.log(e);
            res.withServerError(500).reply();
        }

    }
}