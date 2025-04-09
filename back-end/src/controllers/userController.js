import User from "../models/User.js";

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      res.status(400).json({ message: "Erro ao cadastrar usuario" });
      console.log(e);
    }
  }

  async index(req, res) {
    try {
      const usuarios = await User.find();
      return res.json(usuarios);
    } catch (e) {
      res.status(400).json({ message: "Erro ao listar os usuarios" });
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.email) {
        return res.status(400).json({ message: "Usuario não encontrado" });
      }

      const usuario = await User.findOne({ email: req.params.email });

      if (!usuario) {
        return res.status(400).json({ message: "Usuario não encontrado" });
      }

      const usuarioDeletado = await User.findOneAndDelete(usuario);
      return res.json(usuarioDeletado);
    } catch (e) {
      return res.status(400).json({ message: "Erro ao deletar usuario" });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.email) {
        return res
          .status(400)
          .json({ message: "E-mail invalido || Usuario não encontrado" });
      }

      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res.json(400).json({ message: "Usuario não encontrado" });
      }

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ message: "Erro ao encontrar usuario" });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.email) {
        return res.status(400).json({ message: "E-mail invalido" });
      }

      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res.status(400).json({ message: "Usuario não encontrado" });
      }

      const usuarioAtualizado = await User.findOneAndUpdate(user, req.body, {
        new: true,
      });

      return res.json(usuarioAtualizado);
    } catch (e) {
      res.status(400).json({ message: "Erro ao atualizar usuario" });
      console.log(e);
    }
  }
}

export default new UserController();
