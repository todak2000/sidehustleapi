
module.exports = class Base {

    static sequelize = require('../models').Sequelize;
    static Sequelize = require('../models').Sequelize;


    static  async create(reqBody,transaction=null,moreObj={}){
        // let options = {}
        // if (transaction != null){
        //     options = {
        //         transaction
        //     }
        // }
        return this.model.create(reqBody,{
            ...moreObj,
            transaction
        });
    }

    static async update(data,query){
        return this.model.update(data,query);
    }

    static startTransaction(){
        return this.model.sequelize.transaction();
    }


}