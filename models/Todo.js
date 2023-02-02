const { Schema, model, ObjectId } = require("mongoose");

const Todo = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  userId: [{ type: ObjectId, ref: "User" }],
});

module.exports = model("Todo", Todo);
