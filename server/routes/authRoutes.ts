import express from 'express';
import { register, login, getProfile } from '../controllers/authController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;
