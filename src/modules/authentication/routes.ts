/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';
import passport from '../../middleware/passport';
import githubAuthController from './githubAuthController';
import googleAuthController from './googleAuthController';

// Export the router
const router = Router();

router.post('/github', githubAuthController);
router.post('/google', googleAuthController);
router.get('/token', passport.authenticate('jwt'));

export default router;
