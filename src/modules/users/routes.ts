/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from 'src/middleware/authenticate';
import createUserController from './createUserController';
import getUserController from './getUserController';

// Export the router
const router = Router();
router.post('/createUser',authenticate, createUserController);
router.get('/getUser',authenticate, getUserController);
export default router;
