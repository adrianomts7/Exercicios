import User from "../models/User.js";

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (e) {
      res.status(200).json({ message: "Erro ao cadastrar usuario" });
      console.log(e);
    }
  }
}

export default new UserController();
