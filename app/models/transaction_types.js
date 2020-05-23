'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction_types = sequelize.define('Transaction_types', {
    name: DataTypes.STRING
  }, {});
  Transaction_types.associate = function(models) {
    // associations can be defined here
  };
  return Transaction_types;
};