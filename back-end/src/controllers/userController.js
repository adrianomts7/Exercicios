import User from "../models/User.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.find().select("nome email");
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
      const { nome, email } = novoUser;
      return res.json({ nome, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao criar usuario");
    }
  }

  async show(req, res) {
    try {
      if (!req.user.email) {
        return res.status(400).json("E-mail invalido");
      }

      const userExiste = await User.findOne({ email: req.user.email });

      if (!userExiste) {
        return res.status(400).json("Usuario não existe");
      }

      const { nome, email } = userExiste;

      return res.json({ nome, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao procurar usuario!");
    }
  }

  async delete(req, res) {
    try {
      if (!req.user.email) {
        return res.status(400).json("E-mail invalido");
      }

      const userExiste = await User.findOne({ email: req.user.email });

      if (!userExiste) {
        return res.status(400).json("Usuario não existe");
      }

      const userApagado = await User.findOneAndDelete({
        email: req.user.email,
      });

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
      if (!req.user.email) {
        return res.status(400).json("E-mail invalido");
      }

      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res.status(400).json("Usuario não existe");
      }

      const usuarioAtualizado = await User.findOneAndUpdate(user, req.body, {
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
