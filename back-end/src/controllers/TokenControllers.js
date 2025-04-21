import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

class TokenControllers {
  async store(req, res) {
    try {
      const { email = "", password = "" } = req.body;

      if (!email || !password) {
        return res.status(401).json("Email ou Senha está invalido!");
      }

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json("Usuario invalido!");
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json("Senha invalida!");
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      return res.json(token);
    } catch (e) {
      console.log(e);
      return res.status(401).json("Erro: Erro ao criar token");
    }
  }
}

export default new TokenControllers();
