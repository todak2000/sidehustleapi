const {Banks} = require('../models');
const Base                  = require('./base');


module.exports = class Bank extends Base{
    static model = Banks;

    static async getByBankCode(code){
     return await  this.findOne({
            where:{
                code
            }
        })
    }
};