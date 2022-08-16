import { Router } from "express";
import passport from "../../config/passport";
import {
  addUserToWorkspace,
  removeUserFromWorkspace,
  addWorkspaceMembers,
} from "./userworkspaces.controller";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addUserToWorkspace
);
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  addWorkspaceMembers
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  removeUserFromWorkspace
);

export default router;
