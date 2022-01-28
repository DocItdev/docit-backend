/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import createUserController from './createUserController';
import getUserController from './getUserController';

// Export the router
const router = Router();
router.post('/createUser', createUserController);
router.get('/getUser', getUserController);
export default router;
