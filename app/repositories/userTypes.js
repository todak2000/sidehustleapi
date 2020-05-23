const Base = require('./base');
const {User_types} = require('../models');

module.exports = class UserTypes extends Base{

    static model = User_types;

    static async userTypes(){

      let userTypes =   await UserTypes.findAll();
      let userTypesObj = {};

      userTypes.forEach((userType)=>{
          userTypesObj[userType.name] = userType.id;
      });

      return userTypesObj;

    }

}