const Base      = require('./base');
const {Bids} = require('../models');

module.exports = class Bid extends Base{
    static model = Bids;


}

