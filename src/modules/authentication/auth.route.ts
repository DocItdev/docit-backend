/* eslint-disable max-len */
import { Router } from 'express';
import passport from '../../config/passport';
import { githubAuthController, googleAuthController, refreshTokenConroller } from './auth.controller';

// Export the router
const router = Router();

router.post('/github', githubAuthController);
router.post('/google', googleAuthController);
router.get('/refresh', refreshTokenConroller);
router.get('/token', passport.authenticate('jwt'));


export default router;
