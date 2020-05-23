'use strict';
const status = require('../../helpers/statuses');
const projectTypeHelper = require("../../helpers/projectTypes");
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    title: {
      type: DataTypes.STRING(60),
      allowNull:false
    },
    created_by:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    duration:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    amount:{
      type:DataTypes.DOUBLE,
      allowNull:false,
    },
    category_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    project_type_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:projectTypeHelper.open
    },
    local_government_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:status.active
    },
  }, {
    underscored:true,
    createdAt:"created_at",
    updatedAt:"updated_at",

  });
  Projects.associate = function(models) {
    // associations can be defined here
    Projects.belongsTo(models.Categories,{
      as:"category",
      foreignKey:'category_id'
    });
    Projects.belongsTo(models.Local_governments,{
      as:'local_government',
      foreignKey:"local_government_id"
    });
    Projects.belongsTo(models.Statuses,{
      as:"status",
      foreignKey:"status_id"
    });
    Projects.belongsTo(models.Users,{
      foreignKey:'created_by',
      as:"user"
    });
    Projects.hasMany(models.Bids,{
      foreignKey:"project_id",
      as:"bids"
    })
  };
  return Projects;
};