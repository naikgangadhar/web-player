'use strict';
var VideoMetadata = function (sequelize, DataTypes) {
  const VideoMetadata = sequelize.define('VideoMetadata', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{ type:DataTypes.STRING , allowNull: false } ,
    type:{ type:DataTypes.STRING , allowNull: false } ,
    path:{ type:DataTypes.STRING , allowNull: false } ,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt:{ type: DataTypes.DATE , allowNull: false } ,
  }, {
    timestamps: true,
    tableName: 'video_metadata'
  });
  VideoMetadata.associate = function(models) {
    // associations can be defined here
  };
  return VideoMetadata;
};

module.exports = VideoMetadata;