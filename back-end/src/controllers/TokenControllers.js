import jwt from "jsonwebtoken";

import User from "../models/User.js";

class TokenControllers {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email ou senha invalidos");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Usuario invalido");
    }

    if (password !== user.password) {
      return res.status(400).json("Senha invalida");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.json(token);
  }
}

export default new TokenControllers();
