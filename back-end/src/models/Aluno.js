import mongoose from "mongoose";
import validator from "validator";

const AlunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é um campo obrigatorio"],
    minlength: [3, "Nome deve conter no minimo 3 caracteres"],
  },
  sobrenome: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "E-mail é um campo obrigatorio"],
    validate: {
      validator: validator.isEmail,
      message: "E-mail invalido",
    },
  },
  idade: {
    type: Number,
    required: [true, "Idade é obrigatorio"],
  },
  peso: {
    type: Number,
    required: [true, "Peso é um campo obrigatorio"],
  },
  altura: {
    type: Number,
    required: [true, "Altura é um campo obrigatorio"],
  },
  foto: {
    type: String,
  },
  cadastradoEm: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Alunos = mongoose.model("Alunos", AlunoSchema);

export default Alunos;
