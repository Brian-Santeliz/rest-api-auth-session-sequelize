const { Router } = require("express");
const usuarioController = require("../controller/usuariosController");
const router = Router();
const { registrarUsuario, loginUsuario } = new usuarioController();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
module.exports = router;
