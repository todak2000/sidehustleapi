const Base      = require('./base');
const {Project_types: Project_types} = require('../models');

module.exports = class Project_type extends Base{
    static model = Project_types;


}

