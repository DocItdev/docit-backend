import { Router } from "express";
import multer, { Multer } from "multer";
import passport from "../../config/passport";
import { verifyStoreToken } from "./mediastorage.middleware";
import {
  uploadFileController,
  getUploadedFileController,
  deleteUploadedFileController,
  getFileStreamController,
  getStoreTokenController,
} from "./mediastorage.controller";

const router = Router();
const upload: Multer = multer();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("media_file"),
  uploadFileController
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUploadedFileController
);
router.get(
  "/token",
  passport.authenticate("jwt", { session: false }),
  getStoreTokenController,
);
router.get(
  "/stream",
  verifyStoreToken,
  getFileStreamController
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteUploadedFileController
);

export default router;
