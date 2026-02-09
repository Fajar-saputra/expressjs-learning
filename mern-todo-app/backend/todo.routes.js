const express = require("express");
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } = require("./todo.controller");
const validate = require("./middleware/validateMiddleware");
const { todoSchema, updateTodoSchema } = require("./validators/todoValidator");

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", validate(todoSchema), createTodo);
router.patch("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
