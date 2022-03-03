import { Router } from 'express';
import passport from '../../config/passport';
import { githubAuthController, googleAuthController } from './auth.controller';

// Export the router
const router = Router();

router.post('/github', githubAuthController);
router.post('/google', googleAuthController);
router.get('/token', passport.authenticate('jwt'));

export default router;
