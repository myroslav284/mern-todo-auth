import express from 'express';

const router = express.Router();

router.get('/getTodos');
router.post('/createTodo');
router.patch('/editTodo/:id');
router.delete('/deleteTodo/:id');
router.get('/searchTodos');

export default router;