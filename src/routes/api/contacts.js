import { Router } from "express";
import {
  addContCtrl,
  getAllContCtrl,
  getContByIdCtrl,
  removeContByIdCtrl,
  updateContByIdCtrl,
  updateStatusContactCtrl,
} from "../../controllers/contactsCtrl.js";
import { ctrlWrapper } from "../../middleware/ctrlWrapper.js";
import { isValidId } from "../../middleware/idValidation.js";
import { reqValidation } from "../../middleware/reqValidation.js";
import { contactSchema } from "../../schemas/contact.js";
import { favoriteSchema } from "../../schemas/favorite.js";

const router = new Router();

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
