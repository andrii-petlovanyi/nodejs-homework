import { Router } from "express";
import {
  addCont,
  getAllCont,
  getContById,
  removeCont,
  updateCont,
} from "../../controllers/contacts.js";
import { controllerWrapper } from "../../middleware/controllerWrapper.js";
import { reqValidation } from "../../middleware/reqValidation.js";
import { addSchema, updateSchema } from "../../schemas/contact.js";

const router = new Router();

router.get("/", controllerWrapper(getAllCont));

router.get("/:contactId", controllerWrapper(getContById));

router.post("/", reqValidation(addSchema), controllerWrapper(addCont));

router.delete("/:contactId", controllerWrapper(removeCont));

router.put(
  "/:contactId",
  reqValidation(updateSchema),
  controllerWrapper(updateCont)
);

export { router as contactsRouter };
