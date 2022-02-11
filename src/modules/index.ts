import { Express } from 'express';
import healthCheckRouter from './healthcheck/routes';
import userRouter from './users/routes';
import authRouter from './authentication/routes';
import projectRouter from './projects/routes'

export default function initRoutes(app: Express) {
  // health check routes
  app.use('/', healthCheckRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/project', projectRouter);
}