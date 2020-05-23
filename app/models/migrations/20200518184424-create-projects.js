'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(60),
        allowNull:false
      },
      created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false
      },
      duration:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      amount:{
        type:Sequelize.DOUBLE,
        allowNull:false,
      },
      category_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      local_government_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      project_type_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      status_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }


    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};