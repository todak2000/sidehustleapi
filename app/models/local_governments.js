'use strict';
module.exports = (sequelize, DataTypes) => {
  const Local_governments = sequelize.define('Local_governments', {
    name: {
      type: DataTypes.STRING
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {timestamps:false,underscored:true});
  Local_governments.associate = function(models) {
    // associations can be defined here
    Local_governments.belongsTo(models.States,{
      as:"state",
      foreignKey:"state_id"
    });
    Local_governments.belongsTo(models.States,{
      as:"status",
      foreignKey:"status_id"
    });
  };
  return Local_governments;
};