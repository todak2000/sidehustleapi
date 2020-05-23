const {Projects}             = require('../models');
const Base                  = require('./base');


module.exports = class Project extends Base{

   static model = Projects;

};