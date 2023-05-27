import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { createTodoController, deleteTodoController, editTodoController, getTodosController, searchTodoController } from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/getTodos', userAuth, getTodosController);
router.post('/createTodo', userAuth, createTodoController);
router.patch('/editTodo/:id', userAuth, editTodoController);
router.delete('/deleteTodo/:id',userAuth, deleteTodoController);
router.get('/searchTodos', userAuth, searchTodoController);

export default router;