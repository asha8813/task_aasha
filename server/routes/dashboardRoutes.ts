import express from 'express';
import { getStats, getTeamStats } from '../controllers/dashboardController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', getStats);
router.get('/team', getTeamStats);

export default router;
