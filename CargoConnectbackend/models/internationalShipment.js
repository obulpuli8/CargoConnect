const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const InternationalShipment = sequelize.define('InternationalShipment', {
  arrivalCountry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customsCleared: {
    type: DataTypes.ENUM('yes', 'no'),
    allowNull: false,
  },
  importDuty: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = InternationalShipment;
