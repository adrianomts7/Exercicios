import dotenv from "dotenv";
import express from "express";

import alunos from "./src/routes/alunos.js";
import foto from "./src/routes/fotos.js";
import home from "./src/routes/home.js";
import token from "./src/routes/token.js";
import user from "./src/routes/user.js";

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", home);
    this.app.use("/user", user);
    this.app.use("/tokens", token);
    this.app.use("/alunos", alunos);
    this.app.use("/fotos", foto);
  }
}

export default new App().app;
