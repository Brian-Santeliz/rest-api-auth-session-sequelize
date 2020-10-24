const Sequelize = require("sequelize");
const connect = require("../DB/database");

module.exports = connect.define("usuarios", {
  usuario: {
    type: Sequelize.STRING,
  },
  contraseña: {
    type: Sequelize.STRING,
  },
});
