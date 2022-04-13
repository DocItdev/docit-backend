import { Express } from 'express';
import healthCheckRouter from './healthcheck/healthcheck.route';
import userRouter from './users/users.route';
import authRouter from './authentication/auth.route';
import projectRouter from './projects/projects.route';
import documentRouter from './documents/documents.route';
import postRouter from './posts/posts.route';
import mediaStoreRouter from './mediastorage/mediastorage.route';

export default function initRoutes(app: Express) {
  // health check routes
  app.use('/api', healthCheckRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/documents', documentRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/storage', mediaStoreRouter);
}