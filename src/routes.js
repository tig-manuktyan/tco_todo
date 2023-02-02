const authRouter = require("./components/auth/api");
const todoRouter = require("./components/todo/api");

module.exports = (app) => {
  app.use(authRouter);
  app.use(todoRouter);
};
