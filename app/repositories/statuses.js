const Base = require('./base');
const Status = require('../models').Statuses;

module.exports = class Statuses extends Base{

    static model = Status;

}