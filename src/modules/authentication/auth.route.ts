import { Router } from "express";
import passport from "../../config/passport";
import {
  githubAuthController,
  googleAuthController,
  refreshTokenConroller,
} from "./auth.controller";

import {validateRefreshToken} from "./auth.middleware";

// Export the router
const router = Router();

router.post("/github", githubAuthController);
router.post("/google", googleAuthController);
router.get("/token", passport.authenticate("jwt"));
router.get("/refresh",validateRefreshToken, refreshTokenConroller);

export default router;
