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
import {
  contactSchema,
  favoriteSchema,
} from "../../models/joi/contactSchema.js";

const router = new Router();

router.use(checkJWTAuth);
router.get("/", ctrlWrapper(getAllContCtrl));
router.get("/:contactId", isValidId, ctrlWrapper(getContByIdCtrl));
router.post("/", reqValidation(contactSchema), ctrlWrapper(addContCtrl));
router.delete("/:contactId", isValidId, ctrlWrapper(removeContByIdCtrl));
router.put(
  "/:contactId",
  isValidId,
  reqValidation(contactSchema),
  ctrlWrapper(updateContByIdCtrl)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  reqValidation(favoriteSchema),
  ctrlWrapper(updateStatusContactCtrl)
);

export { router as contactsRouter };
