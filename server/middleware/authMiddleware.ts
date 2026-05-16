import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.ts';
import mongoose from 'mongoose';

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.userId).select('-password');
    }
    
    // Fallback for in-memory/resilient mode if DB is missing or user not found in DB
    if (!user) {
      // In demo mode, we trust the information stored in the token's payload
      user = { 
        _id: decoded.userId, 
        name: decoded.name || 'User', 
        role: decoded.role || 'Member' 
      };
    }
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const adminMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
