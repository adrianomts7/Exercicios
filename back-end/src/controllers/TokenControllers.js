import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

class TokenControllers {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json("Email ou senha está invalido");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json("Usuario não encontrado");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json("Senha invalida");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.json(token);
  }
}

export default new TokenControllers();
