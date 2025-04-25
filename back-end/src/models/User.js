import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 15],
        message: "O nome deve ter entre 2 a 15 letras",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        message: "Digite um e-mail valido",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  criadoEm: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Sicroniza a tabela automaticamente
await UserModel.sync();

export default UserModel;
