import { Router } from "express";
import passport from "../../config/passport";
import {
  createWorkspaceController,
  getAllUserWorkspaces,
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

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getAllUserWorkspaces
);

export default router;
