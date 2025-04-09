import dotenv from "dotenv";
import express from "express";

import home from "./src/routes/home.js";
import user from "./src/routes/user.js";

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", home);
    this.app.use("/user", user);
  }
}

export default new App().app;
