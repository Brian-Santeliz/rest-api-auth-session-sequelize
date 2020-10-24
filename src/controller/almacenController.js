const Producto = require("../models/Producto");
const usuarioController = require("./usuariosController");

class AlmacenController extends usuarioController {
  obtenerProducto(req, res) {
    const usuario = req.session.usuario;
    Producto.findAll()
      .then((respuesta) => res.status(200).json({ usuario, respuesta }))
      .catch((error) => res.status(500).json(error));
  }
  obtenerProductoId(req, res) {
    const { id } = req.params;
    Producto.findOne({ where: { id } })
      .then((respuesta) => {
        if (!respuesta) return res.json("No existe este producto");
        res.status(200).json(respuesta);
      })
      .catch((error) => res.status(500).json(error));
  }
  agregarProducto(req, res) {
    const { nombre, descripcion, marca } = req.body;
    if (nombre && descripcion && marca) {
      Producto.create({
        nombre,
        descripcion,
        marca,
      })
        .then((respuesta) => {
          res
            .status(200)
            .json({ mensaje: "Producto almacenado correctamente", respuesta });
        })
        .catch((error) => res.status(500).json(error));
      return;
    }
    return res
      .status(400)
      .json("Los campos nombre, descripcion & marca son requeridos");
  }
  actualizarProducto(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, marca } = req.body;
    if (nombre && descripcion && marca) {
      Producto.update(
        {
          nombre,
          descripcion,
          marca,
        },
        {
          where: {
            id,
          },
        }
      )
        .then(() => {
          res.status(201).json("Producto actualizado");
        })
        .catch((error) => res.status(500).json(error));

      return;
    }
    return res
      .status(400)
      .json("Los campos nombre, descripcion & marca son requeridos");
  }
  eliminarProducto(req, res) {
    const { id } = req.params;
    Producto.destroy({ where: { id } })
      .then(res.status(200).json("El producto ha sido eliminado correctamente"))
      .catch((error) => res.status(500).json(error));
  }
  obtenerProductoNombre(req, res) {
    const { nombre } = req.params;
    Producto.findAll({
      where: {
        nombre,
      },
    })
      .then((respuesta) => res.status(200).json(respuesta))
      .catch((error) => res.status(500).json(error));
  }
}
module.exports = AlmacenController;
