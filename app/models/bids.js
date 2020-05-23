'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bids = sequelize.define('Bids', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull:false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:Date.now()
    },
  }, {
    underscored:true,timestamps:false
  });
  Bids.associate = function(models) {
    // associations can be defined here
    Bids.belongsTo(models.Projects,{
      as:"project",
      foreignKey:"project_id"
    });
    Bids.belongsTo(models.Statuses,{
      as:"status",
      foreignKey:"status_id"
    });
    Bids.belongsTo(models.Users,{
      as:"bidder",
      foreignKey:"user_id"
    })
  };
  return Bids;
};