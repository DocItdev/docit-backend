/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../config/passport';
import { createUserController, getUserController } from './users.controller';

// Export the router
const router = Router();
router.post('/createUser',passport.authenticate('jwt', { session: false }), createUserController);
router.get('/getUser',passport.authenticate('jwt', { session: false }), getUserController);
export default router;
