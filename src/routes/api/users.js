import express from "express";

import {
  getCurrentUserCtrl,
  logOutCtrl,
  signInCtrl,
  signUpCtrl,
  updateAvatarCtrl,
  updateSubsCtrl,
} from "../../controllers/userCtrl.js";
import { checkJWTAuth } from "../../middleware/checkJWTAuth.js";
import { ctrlWrapper } from "../../middleware/ctrlWrapper.js";
import { reqValidation } from "../../middleware/reqValidation.js";
import { uploadAvatar } from "../../middleware/uploadAvatar.js";
import {
  singInJoiSchema,
  singUpJoiSchema,
  subscriptionJoiSchema,
} from "../../schemas/userSchema.js";

const router = express.Router();

router.post("/signup", reqValidation(singUpJoiSchema), ctrlWrapper(signUpCtrl));
router.get("/signin", reqValidation(singInJoiSchema), ctrlWrapper(signInCtrl));
router.post("/logout", checkJWTAuth, ctrlWrapper(logOutCtrl));
router.get("/current", checkJWTAuth, ctrlWrapper(getCurrentUserCtrl));
router.patch(
  "/",
  checkJWTAuth,
  reqValidation(subscriptionJoiSchema),
  ctrlWrapper(updateSubsCtrl)
);
router.patch(
  "/avatars",
  checkJWTAuth,
  uploadAvatar.single("avatar"),
  ctrlWrapper(updateAvatarCtrl)
);

export { router as authRouter };
