import { Router } from 'express';
import passport from '../../config/passport';
import { createWorkspaceController } from './workspaces.controller';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createWorkspaceController);

export default router;
