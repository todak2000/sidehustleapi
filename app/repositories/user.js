const Base      = require('./base');
const {Users} = require('../models');

module.exports = class User extends Base{
    static model = Users;


}

