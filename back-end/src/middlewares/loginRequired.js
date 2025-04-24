import jwt from "jsonwebtoken";

import User from "../models/User.js";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Faça login");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return res.status(400).json("Token invalido");
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = dados;

    const user = await User.findOne({ where: { email } });

    req.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json("Token invalido!");
  }
};
