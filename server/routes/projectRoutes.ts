import express from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.ts';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
