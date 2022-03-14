import { Router } from 'express';
import passport from '../../config/passport';
import {
  createProjectController,
  getAllProjectsController,
  getProjectController,
  deleteProjectController,
  updateProjectController,
} from './projects.controller';


const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createProjectController);
router.get('/all',passport.authenticate('jwt', { session: false }), getAllProjectsController);
router.get('/:id',passport.authenticate('jwt', { session: false }), getProjectController);
router.put('/:id',passport.authenticate('jwt', { session: false }), updateProjectController);
router.delete('/:id',passport.authenticate('jwt', { session: false }), deleteProjectController);


export default router;

