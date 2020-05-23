const {Users,Companies}     = require('../models');
const Base                  = require('./base');
const {userTypes}           = require('../repositories/userTypes');


module.exports = class User extends Base{

   static model = Users;

}