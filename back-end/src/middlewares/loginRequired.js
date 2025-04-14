import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json("Faça login");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return res.status(400).json({ message: "Tokens invalidos" });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = dados;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json("Token invalido");
  }
};
