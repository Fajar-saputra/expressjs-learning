const { z } = require('zod');

const todoSchema = z.object({
  task: z.string().min(4, "Task minimal 4 karakter").max(255),
  status: z.boolean().optional()
});

const updateTodoSchema = z.object({
  task: z.string().min(3).max(255).optional(),
  status: z.boolean().optional()
});

module.exports = { todoSchema, updateTodoSchema };