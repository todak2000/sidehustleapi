'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_types = sequelize.define('Project_types', {
    name: {
      type: DataTypes.STRING
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {underscored:true,timestamps:false});
  project_types.associate = function(models) {
    // associations can be defined here
  };
  return project_types;
};