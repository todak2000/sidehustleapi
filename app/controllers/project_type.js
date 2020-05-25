const repo = require('../repositories/project_type');

module.exports = class Project_types{
     static async list(req,res){
        try{
            let projectTypes = await repo.findAll();
            if(projectTypes){
                return res.withSuccess(200).withData(projectTypes).reply();
            }
            return res.withClientError(404).reply();

        }catch(e){
            console.log(e);
            res.withServerError(500).reply();
        }

    }
}