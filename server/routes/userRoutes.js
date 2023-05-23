import express from 'express';
import { getMe, login, signup } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/auth/login', login);
router.post('/auth/signup', signup);
router.get('/auth/me',userAuth, getMe);



export default router;