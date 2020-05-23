'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Local_governments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Local_governments');
  }
};