import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, addComment } from '../controllers/taskController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/comments', addComment);

export default router;
