import dotenv from "dotenv";

import app from "./app.js";
import sequelize from "./src/config/database.js";

dotenv.config();

async function conection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao MYSQL com sucesso");

    await sequelize.sync();
    console.log("Sicronizando tabelas");

    app.listen(process.env.APP_PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.error("Erro ao iniciar o servidor e conectar no banco de dados", e);
  }
}

conection();
