import Alunos from "../models/Aluno.js";

class HomeController {
  async index(req, res) {
    const novoAluno = await Alunos.create({
      nome: "Adriano",
      sobrenome: "Mateus",
      email: "adriano@gmail.com",
      idade: 20,
      peso: 62,
      altura: 1.72,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
