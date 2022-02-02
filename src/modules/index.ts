import { Express } from 'express';
import healthCheckRouter from './healthcheck/routes';
import userRouter from './users/routes';
import authRouter from './authentication/routes';

export default function initRoutes(app: Express) {
  // health check routes
  app.use('/api/healthcheck', healthCheckRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter)
}