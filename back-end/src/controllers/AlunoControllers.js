import Alunos from "../models/Aluno.js";

class AlunoControllers {
  async index(req, res) {
    try {
      const alunos = await Alunos.find().select("nome email");
      if (alunos.length < 1) {
        return res.status(400).json("Não tem nenhum aluno cadastrado!");
      }
      return res.json(alunos);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao buscar todos os alunos!");
    }
  }

  async show(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(401).json("E-mail do aluno invalido!");
      }

      const aluno = await Alunos.findOne({ email });

      if (!aluno) {
        return res.status(400).json("Aluno não encontrado");
      }

      return res.json({ message: "Dados do aluno encontrado: ", aluno: aluno });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao buscar aluno!");
    }
  }

  async store(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(401).json("Os dados enviados são invalidos!");
      }

      const aluno = await Alunos.findOne({ email: req.body.email });

      if (aluno) {
        return res.status(400).json("Aluno já existe!");
      }

      const newAluno = await Alunos.create(req.body);
      const { nome } = newAluno;

      return res.json({
        message: "Aluno criado com sucesso",
        aluno: `${nome} foi criado com sucesso!`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao cadastrar usuario!");
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(401)
          .json("Digite o e-mail do aluno que deseja apagar!");
      }

      const aluno = await Alunos.findOne({ email });

      if (!aluno) {
        return res.status(400).json("Aluno não existe");
      }

      const alunoDeleted = await Alunos.findOneAndDelete({
        email: req.body.email,
      });

      const { nome } = alunoDeleted;

      return res.json({
        message: "Aluno deletado com sucesso!",
        aluno: `${nome} foi deletado com sucesso!`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao deletar usuario!");
    }
  }

  async update(req, res) {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(401).json("E-mail invalido!");
      }

      const studentExist = await Alunos.findOne({ email });

      if (!studentExist) {
        return res.status(400).json("Aluno não existe");
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(401)
          .json("Digite dados válidos para editar o aluno!");
      }

      const studentEdited = await Alunos.findOneAndUpdate({ email }, req.body, {
        new: true,
      });
      const { nome } = studentEdited;

      return res.json({
        message: "Aluno editado com sucesso!",
        alunoDeletado: `${nome} foi editado`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro editar aluno");
    }
  }
}

export default new AlunoControllers();
