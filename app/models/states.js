'use strict';
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define('States', {
    name: {
      type: DataTypes.STRING
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {underscored:true,timestamps:false});
  States.associate = function(models) {
    States.belongsTo(models.Statuses,{
      as:"status",
      foreignKey:'status_id'
    });
    States.hasMany(models.Local_governments,{
      as:"lgas",
      foreignKey:'state_id'
    });
    // associations can be defined here
  };
  return States;
};