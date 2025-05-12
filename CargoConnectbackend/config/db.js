const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cargoconnect_db', 'root', 'Sharan@2006', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
