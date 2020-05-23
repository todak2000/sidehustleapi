const Base      = require('./base');
const {Projects} = require('../models');

module.exports = class User extends Base{
    static model = Projects;


}

