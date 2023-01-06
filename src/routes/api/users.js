import express from "express";

import {
  getCurrentUserCtrl,
  logOutCtrl,
  signInCtrl,
  signUpCtrl,
  updateSubsCtrl,
} from "../../controllers/userCtrl.js";
import { checkJWTAuth } from "../../middleware/checkJWTAuth.js";
import { ctrlWrapper } from "../../middleware/ctrlWrapper.js";
import { reqValidation } from "../../middleware/reqValidation.js";
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

export { router as authRouter };
