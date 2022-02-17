import { Express } from 'express';
import healthCheckRouter from './healthcheck/routes';
import userRouter from './users/routes';
import authRouter from './authentication/routes';
import projectRouter from './projects/routes';
import documentRouter from './documents/routes';
import postRouter from './posts/routes';

export default function initRoutes(app: Express) {
  // health check routes
  app.use('/', healthCheckRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/documents', documentRouter);
  app.use('/api/posts', postRouter);
}