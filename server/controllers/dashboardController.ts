import { Response } from 'express';
import { Project } from '../models/Project.ts';
import { Task } from '../models/Task.ts';
import { User } from '../models/User.ts';

export const getStats = async (req: any, res: Response) => {
  try {
    let projectQuery: any = {};
    let taskQuery: any = {};

    if (req.user.role !== 'Admin') {
      const userProjects = await Project.find({ $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }] });
      const projectIds = userProjects.map(p => p._id);
      projectQuery = { _id: { $in: projectIds } };
      taskQuery = { project: { $in: projectIds } };
    }

    const totalProjects = await Project.countDocuments(projectQuery);
    const totalTasks = await Task.countDocuments(taskQuery);
    const completedTasks = await Task.countDocuments({ ...taskQuery, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ ...taskQuery, status: { $ne: 'Completed' } });
    
    // Overdue tasks
    const now = new Date();
    const overdueTasks = await Task.countDocuments({ 
      ...taskQuery, 
      status: { $ne: 'Completed' },
      dueDate: { $lt: now }
    });

    // Task stats by priority
    const taskPriorities = await Task.aggregate([
      { $match: taskQuery },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Task stats by status
    const taskStatus = await Task.aggregate([
      { $match: taskQuery },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      taskPriorities,
      taskStatus
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamStats = async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const teamCount = await User.countDocuments();
    const members = await User.find().select('-password');
    
    res.json({
      teamCount,
      members
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
