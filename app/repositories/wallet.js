const {Wallets}     = require('../models');
const Base                  = require('./base');


module.exports = class Wallet extends Base{

   static model = Wallets;

}