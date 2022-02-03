/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';
import githubAuthController from './githubauthController';
import googleAuthController from './googleAuthController';

// Export the router
const router = Router();

router.post('/github-auth', githubAuthController);
router.post('/google-auth', googleAuthController);

export default router;
