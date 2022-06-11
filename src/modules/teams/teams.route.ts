import { Router } from 'express';
import passport from '../../config/passport';
import { createTeamController } from './teams.controller';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createTeamController);

export default router;
