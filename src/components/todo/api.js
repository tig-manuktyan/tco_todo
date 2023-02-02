const express = require("express");
const authMiddleware = require("./../../../middleware/auth.middleware");
const todoCtr = require("./service");

const todoRouter = express.Router();

todoRouter.post("/create", authMiddleware, todoCtr.createTodo);
todoRouter.get("/get", authMiddleware, todoCtr.getAll);
todoRouter.delete("/delete", authMiddleware, todoCtr.deleteTodo);

module.exports = todoRouter;
