import { Router } from 'express';
import passport from '../../config/passport';
import { githubAuthController, googleAuthController, refreshTokenConroller } from './auth.controller';

// Export the router
const router = Router();

router.post('/github', githubAuthController);
router.post('/google', googleAuthController);
router.get('/token', passport.authenticate('jwt'));
router.get('/refresh', passport.authenticate('jwt'), refreshTokenConroller);

export default router;
