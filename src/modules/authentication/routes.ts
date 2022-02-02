/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';
import authenticateController from './authenticateController';

// Export the router
const router = Router();

router.post('/authenticate', authenticateController);

export default router;
