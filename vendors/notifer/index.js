const notifier = require('./notifier');
module.exports = function (Sequelize) {

    Sequelize.Model.prototype.notify = function (options){
       return  notifier(this,options)
    }

}
