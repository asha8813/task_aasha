import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import authRoutes from './server/routes/authRoutes.ts';
import projectRoutes from './server/routes/projectRoutes.ts';
import taskRoutes from './server/routes/taskRoutes.ts';
import dashboardRoutes from './server/routes/dashboardRoutes.ts';

// Load env vars
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
      .then(() => console.log('Connected to MongoDB Atlas'))
      .catch(err => console.error('MongoDB connection error:', err));
  } else {
    console.warn('MONGODB_URI not found. Database features will be disabled. Set it up in .env or secrets.');
  }

  // Middleware
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
