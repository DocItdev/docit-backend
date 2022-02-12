/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import passport from '../../middleware/passport';
import createDocumentController from './createDocumentController';
import deleteDocumentController from './deleteDocumentController';
import getAllDocumentsController from './getAllDocumentsController';
import updateDocumentController from './updateDocumentController';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createDocumentController);
router.get('/', passport.authenticate('jwt', { session: false }), getAllDocumentsController);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateDocumentController);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteDocumentController);

export default router;
