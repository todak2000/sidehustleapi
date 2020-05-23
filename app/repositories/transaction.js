const {Transactions}     = require('../models');
const Base                                = require('./base');



module.exports = class Transaction extends Base{

    static model = Transactions;

}