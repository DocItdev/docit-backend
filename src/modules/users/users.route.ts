/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../config/passport';
import { createUserController, getUserController, deleteUserController } from './users.controller';

// Export the router
const router = Router();
router.post('/',passport.authenticate('jwt', { session: false }), createUserController);
router.get('/:email',passport.authenticate('jwt', { session: false }), getUserController);
router.delete('/:id',passport.authenticate('jwt', { session: false }), deleteUserController);
export default router;
