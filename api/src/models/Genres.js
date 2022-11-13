const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('genres', {
 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
  })
}