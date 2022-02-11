/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../middleware/passport';
import getAllProjectsController from './getAllProjectsController';
import createProjectController from './createProjectController';

const router = Router();

router.post('/', createProjectController);
router.get('/all',/*passport.authenticate('jwt', { session: false }),*/ getAllProjectsController);


export default router;

