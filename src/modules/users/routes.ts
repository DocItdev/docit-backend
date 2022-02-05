/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../middleware/passport';
import createUserController from './createUserController';
import getUserController from './getUserController';

// Export the router
const router = Router();
router.post('/createUser',passport.authenticate('jwt', { session: false }), createUserController);
router.get('/getUser',passport.authenticate('jwt', { session: false }), getUserController);
export default router;
