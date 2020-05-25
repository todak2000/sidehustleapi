const Base      = require('./base');
const { Categories} = require('../models');

module.exports = class Category extends Base{
    static model = Categories;


}

