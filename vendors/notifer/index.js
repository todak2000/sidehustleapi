const notifier = require('./notifier');
module.exports = function (Sequelize) {

    Sequelize.Model.prototype.notify = function (notificationObject){
        //check if it has been instantiated

       return  notifier(this,options)
    }

};
