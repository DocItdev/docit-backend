/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../middleware/passport';
import createPostController from './createPostController';
import deletePostController from './deletePostController';
import getAllPostsController from './getAllPostsController';
import updatePostController from './updatePostController';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createPostController);
router.get('/', passport.authenticate('jwt', { session: false }), getAllPostsController);
router.put('/:id', passport.authenticate('jwt', { session: false }), updatePostController);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deletePostController);



export default router;
