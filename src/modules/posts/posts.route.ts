import { Router } from 'express';
import passport from '../../config/passport';
import {
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} from './posts.controller';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createPostController);
router.get('/', passport.authenticate('jwt', { session: false }), getAllPostsController);
router.put('/:id', passport.authenticate('jwt', { session: false }), updatePostController);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deletePostController);



export default router;