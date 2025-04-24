import bcrypt from "bcrypt";

import User from "../models/User.js";

class UserControllers {
  async create(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(401).json("Os campos não podem estar vazios");
      }

      const userExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res.status(401).json("Usuario já existe!");
      }

      const hash = bcrypt.hashSync(req.body.password, 10);

      req.body.password = hash;

      const newUser = await User.create(req.body);

      const { nome, email } = newUser;

      return res.status(201).json({
        message: "Usuario criado com sucesso",
        user: nome,
        email,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao criar usuario");
    }
  }

  async show(req, res) {
    try {
      if (!req.body.email) {
        return res.status(400).json("E-mail invalido!");
      }

      const user = await User.findOne({ where: { email: req.user.email } });

      if (!user) {
        return res.status(400).json("Usuario invalido!");
      }

      const { nome, email } = user;

      return res.status(200).json({
        message: "Usuario encontrado com sucesso!",
        usuario: `O usario ${nome} com o email ${email}`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao procurar usuario!");
    }
  }

  async delete(req, res) {
    try {
      if (!req.user.email) {
        return res.status(401).json("Digite um email valido");
      }

      const userExist = await User.findOne({
        where: { email: req.user.email },
      });

      if (!userExist) {
        return res.status(400).json("Usuario não existe");
      }

      const { nome } = userExist;

      await userExist.destroy();

      return res.status(200).json({
        message: "Usuario deletado com sucesso",
        user: `O Usuario ${nome} foi deletado`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar usuario!");
    }
  }

  async update(req, res) {
    try {
      const { email } = req.user;

      if (!email) {
        return res.status(401).json("E-mail invalido");
      }

      const userExist = await User.findOne({
        where: { email },
      });

      if (!userExist) {
        return res.status(401).json("Usuario não encontrado");
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(401).json("Os campos não podem estar vazio");
      }

      const userUpdated = {
        nome: req.body.nome,
        password: req.body.password,
      };

      const { nome } = userUpdated;

      await User.update(userUpdated, {
        where: { email },
      });

      return res.status(200).json({
        message: "Usuario atualizado com sucesso",
        userUpdated: `${nome} foi atualizado com sucesso`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao editar o usuario");
    }
  }
}

export default new UserControllers();
