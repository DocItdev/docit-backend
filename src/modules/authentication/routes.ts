import { Router } from 'express';
import passport from '../../middleware/passport';
import loginController from './loginController';
import logoutController from './logoutController';
import githubCallbackController from './githubCallbackController';

// Export the router
const router = Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', passport.authenticate('github'), loginController);

router.get('/logout', logoutController )

router.get('/github/callback',  passport.authenticate('github', {
    failureRedirect: '/api/auth/error',
}), githubCallbackController);

export default router;
