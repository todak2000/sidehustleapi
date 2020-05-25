const repo = require('../repositories/status');

module.exports = class Status{
    static async list(req,res){
        try{
            let status = await repo.findAll();
            if(status){
                return res.withSuccess(200).withData(status).reply();
            }
            return res.withClientError(404).reply();

        }catch(e){
            console.log(e);
            res.withServerError(500).reply();
        }

    }
}