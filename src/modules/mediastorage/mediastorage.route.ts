import { Router } from "express";
import multer, { Multer } from "multer";
import passport from "../../config/passport";
import {
  uploadFileController,
  getUploadedFileController,
  deleteUploadedFileController,
  getAllFileRecordsController,
} from "./mediastorage.controller";

const router = Router();
const upload: Multer = multer();

router.post(
  "/:docId",
  passport.authenticate("jwt", { session: false }),
  upload.single("media_file"),
  uploadFileController
);
router.get(
  "/:fileKey",
  passport.authenticate("jwt", { session: false }),
  getUploadedFileController
);
router.get(
  "/all/:docId",
  passport.authenticate("jwt", { session: false }),
  getAllFileRecordsController
);
router.delete(
  "/:fileKey",
  passport.authenticate("jwt", { session: false }),
  deleteUploadedFileController
);

export default router;
