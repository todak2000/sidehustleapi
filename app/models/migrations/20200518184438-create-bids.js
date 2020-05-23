'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bids');
  }
};