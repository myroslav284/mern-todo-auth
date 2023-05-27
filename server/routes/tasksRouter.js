import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addTaskController, checkUncheckTaskController, deleteTaskController, editTaskController, getTasksController } from '../controllers/taskControllers.js';

const router = express.Router();

router.get('/getTasks/:id', userAuth, getTasksController);
router.put('/addTask/:id', userAuth, addTaskController);
router.put('/checkTask/:todoId/:taskId', userAuth, checkUncheckTaskController);
router.put('/editTask/:todoId/:taskId', userAuth, editTaskController);
router.put('/deleteTask/:todoId/:taskId', userAuth, deleteTaskController);

export default router;