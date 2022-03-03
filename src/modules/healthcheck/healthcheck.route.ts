import { Router } from 'express';
import {healthCheckController} from './healthcheck.controller';

// Export the router
const router = Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', healthCheckController);
export default router;
