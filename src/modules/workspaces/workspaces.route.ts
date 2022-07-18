import { Router } from "express";
import passport from "../../config/passport";
import {
  createWorkspaceController,
  getWorkspaceController,
} from "./workspaces.controller";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createWorkspaceController
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getWorkspaceController
);

export default router;
