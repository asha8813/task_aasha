import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.ts';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// In-memory fallback for demo purposes when DB is not connected or fails
const memoryUsers: Map<string, any> = new Map();

const getResilientUser = async (name: string) => {
  try {
    if (mongoose.connection.readyState === 1) {
      return await User.findOne({ name });
    }
  } catch (e) {
    console.error('DB User Lookup Failed:', e);
  }
  return memoryUsers.get(name);
};

const saveResilientUser = async (userData: any) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = new User(userData);
      await user.save();
      return user;
    }
  } catch (e) {
    console.error('DB User Save Failed:', e);
  }
  const id = new mongoose.Types.ObjectId().toString();
  const newUser = { ...userData, _id: id, id };
  memoryUsers.set(userData.name, newUser);
  return newUser;
};

const updateResilientUser = async (user: any, updates: any) => {
  try {
    if (mongoose.connection.readyState === 1 && user.save) {
      Object.assign(user, updates);
      await user.save();
      return user;
    }
  } catch (e) {
    console.error('DB User Update Failed:', e);
  }
  Object.assign(user, updates);
  return user;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    let user = await getResilientUser(name);
    if (user) {
      user = await updateResilientUser(user, { role: role || user.role });
    } else {
      user = await saveResilientUser({ name, role });
    }

    const userId = user._id || user.id;
    const token = jwt.sign({ userId, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: userId, name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error('Auth Register Error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    let user = await getResilientUser(name);
    
    if (!user) {
      user = await saveResilientUser({ name, role: role || 'Member' });
    } else if (role) {
      user = await updateResilientUser(user, { role });
    }

    const userId = user._id || user.id;
    const token = jwt.sign({ userId, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: userId, name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error('Auth Login Error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

export const getProfile = async (req: any, res: Response) => {
  res.json(req.user);
};
