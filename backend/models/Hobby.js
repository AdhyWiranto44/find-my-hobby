'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hobby.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: DataTypes.STRING,
    visited_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    community_name: DataTypes.STRING,
    community_link: DataTypes.STRING,
    suggester_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hobby',
  });
  return Hobby;
};