'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_types = sequelize.define('User_types', {
    name: DataTypes.STRING
  }, {timestamps:false,underscored:true});
  User_types.associate = function(models) {
    // associations can be defined here
  };
  return User_types;
};