import { Router } from "express";

import {
  addContCtrl,
  getAllContCtrl,
  getContByIdCtrl,
  removeContByIdCtrl,
  updateContByIdCtrl,
  updateStatusContactCtrl,
} from "../../controllers/contactsCtrl.js";
import {
  checkJWTAuth,
  ctrlWrapper,
  isValidId,
  reqValidation,
} from "../../middleware/index.js";
import { contactSchema, favoriteSchema } from "../../schemas/contactSchema.js";

const router = new Router();

router.get("/", checkJWTAuth, ctrlWrapper(getAllContCtrl));

router.get(
  "/:contactId",
  checkJWTAuth,
  isValidId,
  ctrlWrapper(getContByIdCtrl)
);

router.post(
  "/",
  checkJWTAuth,
  reqValidation(contactSchema),
  ctrlWrapper(addContCtrl)
);

router.delete(
  "/:contactId",
  checkJWTAuth,
  isValidId,
  ctrlWrapper(removeContByIdCtrl)
);

router.put(
  "/:contactId",
  checkJWTAuth,
  isValidId,
  reqValidation(contactSchema),
  ctrlWrapper(updateContByIdCtrl)
);

router.patch(
  "/:contactId/favorite",
  checkJWTAuth,
  isValidId,
  reqValidation(favoriteSchema),
  ctrlWrapper(updateStatusContactCtrl)
);

export { router as contactsRouter };
