import User from "../models/User.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao buscar usuarios");
    }
  }

  async create(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json("Parametros invalidos");
      }

      const userExiste = await User.findOne({ email: req.body.email });

      if (userExiste) {
        return res.status(400).json("Usuario invalido");
      }

      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao criar usuario");
    }
  }

  async show(req, res) {
    try {
      if (!req.params.email) {
        return res.status(400).json("E-mail invalido");
      }

      const userExiste = await User.findOne({ email: req.params.email });

      if (!userExiste) {
        return res.status(400).json("Usuario não existe");
      }

      return res.json(userExiste);
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao procurar usuario!");
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.email) {
        return res.status(400).json("E-mail invalido");
      }

      const userExiste = await User.findOne({ email: req.params.email });

      if (!userExiste) {
        return res.status(400).json("Usuario não existe");
      }

      const userApagado = await User.findOneAndDelete(userExiste);

      return res.json({
        message: "Usuario apagado ",
        usuario: userApagado,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao deletar o usuario!");
    }
  }

  async update(req, res) {
    try {
      if (!req.params.email) {
        return res.status(400).json("E-mail invalido");
      }

      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res.status(400).json("Usuario não existe");
      }

      const usuarioAtualizado = await User.findOneAndDelete(user, req.body, {
        new: true,
      });
      return res.json({
        message: "Usuario atualizado com sucesso!",
        usuario: usuarioAtualizado,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao editar usuario");
    }
  }
}

export default new UserController();
