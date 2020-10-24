class Middleware {
  verificarSession(req, res, next) {
    if (!req.session.login) {
      res.status(401).json("No estas autorizado para entrar al almacen.");
      return;
    }
    next();
  }
}

module.exports = Middleware;
