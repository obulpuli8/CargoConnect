const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cargoconnect_db', 'root', '100519', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
