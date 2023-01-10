import express from "express";

import {
  getCurrentUserCtrl,
  logOutCtrl,
  resendEmailCtrl,
  signInCtrl,
  signUpCtrl,
  updateAvatarCtrl,
  updateSubsCtrl,
  verifyEmailCtrl,
} from "../../controllers/userCtrl.js";
import {
  checkJWTAuth,
  ctrlWrapper,
  reqValidation,
  uploadAvatar,
} from "../../middleware/index.js";

import {
  singInJoiSchema,
  singUpJoiSchema,
  subscriptionJoiSchema,
  verificationEmailJoiSchema,
} from "../../schemas/userSchema.js";

const router = express.Router();

router.post("/signup", reqValidation(singUpJoiSchema), ctrlWrapper(signUpCtrl));
router.post("/signin", reqValidation(singInJoiSchema), ctrlWrapper(signInCtrl));

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmailCtrl));
router.post(
  "/verify",
  reqValidation(verificationEmailJoiSchema),
  ctrlWrapper(resendEmailCtrl)
);

router.use(checkJWTAuth);
router.post("/logout", ctrlWrapper(logOutCtrl));
router.get("/current", ctrlWrapper(getCurrentUserCtrl));
router.patch(
  "/",
  reqValidation(subscriptionJoiSchema),
  ctrlWrapper(updateSubsCtrl)
);
router.patch(
  "/avatars",
  uploadAvatar.single("avatar"),
  ctrlWrapper(updateAvatarCtrl)
);

export { router as authRouter };
