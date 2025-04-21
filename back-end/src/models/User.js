import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome é um campo obrigatorio"],
    minlength: [3, "O nome deve ter no minimo 3 caracteres"],
  },

  email: {
    type: String,
    required: [true, "O email é um campo obrigatorio"],
    unique: true,
    validator: {
      validator: validator.isEmail,
      message: "Email invalido",
    },
  },

  password: {
    type: String,
    required: [true, "A senha é obrigatoria"],
    minlength: [3, "A senha deve ter no minimo 3 caracteres"],
  },

  usuarioCriadoEm: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Users = mongoose.model("User", UserSchema);

export default Users;
