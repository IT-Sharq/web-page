const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const PostModel = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },

  name: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT },
});

module.exports = PostModel;
