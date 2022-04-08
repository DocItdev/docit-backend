import { Router } from "express";
import multer, { Multer } from "multer";
import passport from "../../config/passport";
import { uploadFileController } from './mediastorage.controller';

const router = Router();
const upload: Multer = multer();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("media_file"),
  uploadFileController,
);

export default router;
