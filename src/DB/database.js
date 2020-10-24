const Sequelize = require("sequelize");
const ormDb = new Sequelize("almacen-api", "root", "300900", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: "3306",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = ormDb;
