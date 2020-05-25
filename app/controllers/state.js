const repo = require('../repositories/state');

module.exports = class States{
     static async list(req,res){
        try{
            let states = await repo.findAll({
                attributes: {
                  exclude:['status_id']
                },
                include:[
                    {
                        association:"lgas",
                        attributes:{
                            exclude:['state_id','status_id']
                        }
                    }
                ]
            });
            if(states){
                return res.withSuccess(200).withData(states).reply();
            }
            return res.withClientError(404).reply();

        }catch(e){
            console.log(e);
            res.withServerError(500).reply();
        }

    }
}