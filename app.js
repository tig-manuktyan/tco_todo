const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./src/routes");
const config = require("config");

const app = express();

app.use(cors());
app.use(express.json())
routes(app);

const start = async () => {
  try {
    const PORT = config.get("serverPort");
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
