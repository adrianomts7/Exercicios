import bcrypt from "bcrypt";

import User from "../models/User.js";

class UserControllers {
  async create(req, res) {
    try {
      if (!req.body) {
        return res.status(401).json("Erro nos dados enviados");
      }

      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(409).json("Usuario já existe");
      }

      const hashPassword = bcrypt.hashSync(req.body.password, 5);

      req.body.password = hashPassword;

      const newUser = await User.create(req.body);

      const { nome, email } = newUser;
      return res.json({
        message: "Usuario Criado com sucesso!",
        Usuario: nome,
        email,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao criar usuario!");
    }
  }

  async show(req, res) {
    try {
      if (!req.user.email) {
        return res.status(400).json("E-mail invalidos!");
      }

      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res.status(409).json("Usuario não encontrado!");
      }

      const { nome, email } = user;
      return res.json({
        message: "Dados do usuario: ",
        DadosDoUsuario: nome,
        email,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao buscar o usuario");
    }
  }

  async delete(req, res) {
    try {
      if (!req.user.email) {
        return res.status(400).json("E-mail invalidos");
      }

      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res.status(409).json("Usuario não encontrado!");
      }

      const paidUser = await User.findOneAndDelete({ email: req.user.email });

      const { nome, email } = paidUser;
      return res.json({
        message: "Usuario Apagado com sucesso!",
        DadosDoUsuarioApagado: nome,
        email,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar o usuario!");
    }
  }

  async update(req, res) {
    try {
      if (!req.user.email) {
        return res.status(400).json("E-mail invalidos");
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json("Digite os dados que serão atualizados");
      }

      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res.status(409).json("Usuario não encontrado!");
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: req.user.email },
        req.body,
        {
          new: true,
        },
      );

      const { nome } = updatedUser;
      return res.json({ message: `${nome} Foi atualizado com sucesso!` });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao editar o usuario");
    }
  }
}

export default new UserControllers();
