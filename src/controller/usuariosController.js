const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
class usuarioController {
  async registrarUsuario(req, res) {
    try {
      let { usuario, contraseña } = req.body;
      if (usuario && contraseña) {
        const salt = await bcrypt.genSalt(10);
        contraseña = await bcrypt.hash(contraseña, salt);
        const respuesta = await Usuario.create({
          usuario,
          contraseña,
        });
        let registro = "Te has registrado correctamente!";
        res.status(200).json({ registro, respuesta });
      }
      res.status(400).json("Los campos usuario & contraseña son requeridos.");
      return;
    } catch (e) {
      res.status(500).json(e.errors[0].message);
    }
  }
  async loginUsuario(req, res) {
    try {
      const { usuario, contraseña } = req.body;
      if (usuario && contraseña) {
        const respuestaUsuario = await Usuario.findOne({ where: { usuario } });
        if (!respuestaUsuario) {
          return res.status(404).json("Este usuario no existe.");
        }
        if (!(await bcrypt.compare(contraseña, respuestaUsuario.contraseña))) {
          return res.status(401).json("Tu contraseña no es correcta.");
        }
        req.session.login = true;
        req.session.usuario = usuario;
        const loginUsuario = respuestaUsuario.usuario;
        return res.json({
          mensaje:
            "Has iniciado session correctamente, puedes ingresar al almacen.",
          loginUsuario,
        });
      }

      return res
        .status(400)
        .json("Los campos usuario & contraseña son requeridos.");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = usuarioController;
