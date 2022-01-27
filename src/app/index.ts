import { Express } from 'express';
import healthCheckRouter from './healthcheck';
import userRouter from './users';

export default function initRoutes(app: Express) {
  // health check routes
  app.use('/api/healthcheck', healthCheckRouter);
  app.use('/api/users', userRouter);
}