'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: {
      type: DataTypes.STRING
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {underscored:true,timestamps:false});
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};