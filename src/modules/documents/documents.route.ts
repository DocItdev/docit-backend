/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import passport from "../../config/passport";
import {
  createDocumentController,
  getAllDocumentsController,
  updateDocumentController,
  deleteDocumentController,
  getDocumentByIdController,
} from "./documents.controller";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createDocumentController
);
router.get(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  getAllDocumentsController
);
router.get(
  "/:projectId/:docId",
  passport.authenticate("jwt", { session: false }),
  getDocumentByIdController
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateDocumentController
);
router.delete(
  "/:projectId/:docId",
  passport.authenticate("jwt", { session: false }),
  deleteDocumentController
);

export default router;
