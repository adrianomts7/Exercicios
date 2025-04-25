import Aluno from "../models/Aluno.js";

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();

      if (alunos.length < 1) {
        return res.status(401).json("Não tem nenhum aluno cadastrado");
      }

      return res.json(alunos);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao mostrar todos os alunos");
    }
  }

  async show(req, res) {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json("E-mail invalido");
      }

      const aluno = await Aluno.findOne({ where: { email } });

      if (!aluno) {
        return res.status(400).json("Aluno não encontrado!");
      }

      return res.json({ message: "Aluno encontrado com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao procurar aluno");
    }
  }

  async store(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(401).json("Completo os campos");
      }

      const { email } = req.body;

      const alunoExist = await Aluno.findOne({ where: { email } });

      if (alunoExist) {
        return res.status(400).json("O aluno já existe");
      }

      const aluno = await Aluno.create(req.body);

      const { nome, idade } = aluno;

      return res.json({
        message: "Aluno criado com sucesso",
        aluno: `Dados do aluno cadastrado: \nNome: ${nome} \nIdade: ${idade} \nEmail: ${email}`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao cadastrar usuario");
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(401).json("E-mail invalido");
      }

      const aluno = await Aluno.findOne({ where: { email } });

      if (!aluno) {
        return res.status(400).json("Aluno não existe");
      }

      await aluno.destroy();
      return res.json("Aluno excluido com sucesso");
    } catch (e) {
      console.log(e);
      return res.status(400).json("Erro ao deletar usuario");
    }
  }

  async update(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(401).json("E-mail invalido");
      }

      const aluno = await Aluno.findOne({ where: { email } });

      if (!aluno) {
        return res.status(400).json("Aluno não encontrado!");
      }

      const dadosAtualizados = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        altura: req.body.altura,
        peso: req.body.peso,
      };

      await aluno.update(dadosAtualizados);

      return res.json({
        message: "Aluno atualizado com sucesso",
        aluno: dadosAtualizados,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Erro ao editar usuario");
    }
  }
}

export default new AlunoController();
