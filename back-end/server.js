import app from "./app";

const mongoose = require("mongoose");

mongoose.connect(process.env.url_db).then(() => {
  console.log("Conectei a base de dados");
});

app.listen(process.env.APP_PORT);
