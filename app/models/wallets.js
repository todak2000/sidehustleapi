'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallets = sequelize.define('Wallets', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull:false,
      defaultValue:0.00
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:Date.now()
    }
  }, {underscored:true,timestamps:false});
  Wallets.associate = function(models) {
    // associations can be defined here
  };
  return Wallets;
};