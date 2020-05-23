
module.exports =  class Base {

    static sequelize = require('../models').Sequelize;
    static Sequelize = require('../models').Sequelize;

    static   findOne(where){
         return  this.model.findOne(where);
    }

  static async  findAll(where){
        return  this.model.findAll(where);
    }




};

