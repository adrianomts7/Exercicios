import mongoose from "mongoose";

import app from "./app.js";

mongoose
  .connect(process.env.url_db)
  .then(() => {
    console.log("Conectei a base de dados");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.APP_PORT);
