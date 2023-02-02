const Todo = require("../../../models/Todo");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, date } = req.body;
    const todo = new Todo({ title, date, userId: req.user.id });
    await todo.save();
    return res.json(todo);
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    return res.json({
      success: true,
      list: todos,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.deleteOne({
      userId: req.user.id,
      _id: req.body.taskID,
    });

    return res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};
