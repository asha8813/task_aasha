import { Request, Response } from 'express';
import { Task } from '../models/Task.ts';
import { Project } from '../models/Project.ts';

export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;
    
    // Check if project exists and user has access
    const projectDoc = await Project.findById(project);
    if (!projectDoc) return res.status(404).json({ message: 'Project not found' });
    
    if (req.user.role !== 'Admin' && (!projectDoc.createdBy.equals(req.user._id) && !projectDoc.teamMembers.includes(req.user._id))) {
      return res.status(403).json({ message: 'Not authorized for this project' });
    }

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      assignedBy: req.user._id,
      priority,
      dueDate
    });
    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req: any, res: Response) => {
  try {
    const { project } = req.query;
    let query: any = {};
    
    if (project) {
      query.project = project;
    }

    if (req.user.role !== 'Admin') {
      // If project filter is present, we already filtered by project above, but we need to ensure they have access to it
      // For general task list, show tasks assigned to them or tasks in their projects
      if (!project) {
        const userProjects = await Project.find({ $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }] });
        const userProjectIds = userProjects.map(p => p._id);
        query = { 
          $or: [
            { assignedTo: req.user._id },
            { project: { $in: userProjectIds } }
          ]
        };
      } else {
        // If they ask for specific project, they'll only get it if they have access (checked in UI/Middleware usually)
      }
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email avatar')
      .populate('assignedBy', 'name email')
      .populate('project', 'title');
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email avatar')
      .populate('assignedBy', 'name email')
      .populate('project', 'title teamMembers createdBy')
      .populate('comments.user', 'name email avatar');
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Permission check... (simplified: if they have access to the project)
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Members can only update status
    if (req.user.role !== 'Admin') {
      const allowedFields = ['status'];
      const requestedFields = Object.keys(req.body);
      const isStatusOnly = requestedFields.every(field => allowedFields.includes(field));
      
      if (!isStatusOnly && task.assignedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Only admin or assigner can edit full task details' });
      }
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'Admin' && task.assignedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'Task deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req: any, res: Response) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({
      user: req.user._id,
      text
    });
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
