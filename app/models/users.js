'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique:true
    },
    phone_number:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: DataTypes.STRING
    },
    user_type_id:{
      type:DataTypes.INTEGER
    },

    verified_at:{
      type:DataTypes.DATE,
      allowNull:true
    },
    status_id:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    local_government_id:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    bio:{
      type:DataTypes.STRING
    },
    rating:{
      type: DataTypes.INTEGER(5),
      defaultValue:0
    }
  }, {underscored:true});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};