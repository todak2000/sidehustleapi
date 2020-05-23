'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      phone_number:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING
      },
      user_type_id:{
        type:Sequelize.INTEGER
      },

      verified_at:{
        type:Sequelize.DATE,
        allowNull:true
      },
      status_id:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      local_government_id:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      bio:{
        type:Sequelize.STRING
      },
      rating:{
        type: Sequelize.INTEGER(5),
        defaultValue:0
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
    return queryInterface.dropTable('Users');
  }
};