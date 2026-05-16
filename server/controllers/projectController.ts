import { Request, Response } from 'express';
import { Project } from '../models/Project.ts';
import { Task } from '../models/Task.ts';

export const createProject = async (req: any, res: Response) => {
  try {
    const { title, description, teamMembers, dueDate } = req.body;
    const project = new Project({
      title,
      description,
      teamMembers,
      dueDate,
      createdBy: req.user._id
    });
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req: any, res: Response) => {
  try {
    let query: any = {};
    if (req.user.role !== 'Admin') {
      query = { $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }] };
    }
    const projects = await Project.find(query).populate('createdBy', 'name email').populate('teamMembers', 'name email');
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'name email').populate('teamMembers', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Check permission
    if (req.user.role !== 'Admin' && (!project.createdBy.equals(req.user._id) && !project.teamMembers.some((m: any) => m._id.equals(req.user._id)))) {
      return res.status(403).json({ message: 'Not authorized to view this project' });
    }

    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.user.role !== 'Admin' && !project.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only admin or creator can update project' });
    }

    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admin can delete project' });
    }

    await Project.deleteOne({ _id: req.params.id });
    await Task.deleteMany({ project: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
