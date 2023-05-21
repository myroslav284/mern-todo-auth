import express from 'express';

const router = express.Router();

router.post('/auth/login');
router.post('/auth/signup');
router.get('/auth/me');



export default router;