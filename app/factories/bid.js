const {Bids}     = require('../models');
const Base                  = require('./base');
const {userTypes}           = require('../repositories/userTypes');


module.exports = class Bid extends Base{

   static model = Bids;

}