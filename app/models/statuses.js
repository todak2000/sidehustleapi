'use strict';
module.exports = (sequelize, DataTypes) => {
  const Statuses = sequelize.define('Statuses', {
    name: DataTypes.STRING
  }, {});
  Statuses.associate = function(models) {
    // associations can be defined here
  };
  return Statuses;
};