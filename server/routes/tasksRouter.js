import express from 'express';

const router = express.Router();

router.get('/getTasks/:id');
router.put('/addTask/:id');
router.put('/checkTask/:todoId/:taskId');
router.put('/editTask/:todoId/:taskId');
router.put('/deleteTask/:todoId/:taskId');

export default router;