/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../middleware/passport';
import getAllProjectsController from './getAllProjectsController';
import createProjectController from './createProjectController';
import getProjectController from './getProjectController';
import updateProjectController from './updateProjectController';
import deleteProjectController from './deleteProjectController';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createProjectController);
router.get('/all',passport.authenticate('jwt', { session: false }), getAllProjectsController);
router.get('/:id',passport.authenticate('jwt', { session: false }), getProjectController);
router.put('/:id',passport.authenticate('jwt', { session: false }), updateProjectController);
router.delete('/:id',passport.authenticate('jwt', { session: false }), deleteProjectController);


export default router;

