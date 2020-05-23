'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banks = sequelize.define('Banks', {
    name: DataTypes.STRING
  }, {});
  Banks.associate = function(models) {
    // associations can be defined here
  };
  return Banks;
};