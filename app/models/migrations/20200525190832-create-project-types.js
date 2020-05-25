'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Project_types');
  }
};