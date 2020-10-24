const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const Mysql = require("express-mysql-session")(session);
const connect = require("./DB/database");
const optionsSesion = require("./DB/config/sessionMysql");
const Middleware = require("./middleware/authSession");
const usuariosRouter = require("./router/usuarioRouter");
const almacenRouter = require("./router/almacenRouter");
const app = express();

app.set("port", 4040);

app.use(morgan("dev"));
app.use(express.json());
const sessionSql = new Mysql(optionsSesion);
app.use(
  session({
    secret: "$2b$10$u21NJKESA6J6Snb/u1JnuuAi3jf7hyp3/y6F0RZf0.pexXuIjn0hq",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 3600000,
    },
    store: sessionSql,
  })
);
const { verificarSession } = new Middleware();
app.use("/usuario", usuariosRouter);
app.use("/almacen", verificarSession, almacenRouter);

connect
  .authenticate()
  .then(() => console.log("Conectada DB"))
  .catch(console.log);
app.listen(app.get("port"), () =>
  console.log(`Servidor corriendo en el puerto: ${app.get("port")}`)
);
