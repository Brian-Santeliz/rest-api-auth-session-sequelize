const Sequelize = require("sequelize");
const connect = require("../DB/database");

module.exports = connect.define("productos", {
  nombre: {
    type: Sequelize.STRING,
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  marca: {
    type: Sequelize.STRING,
  },
});
