const express = require("express");

const router = express.Router();

const { ctrlContacts } = require("../../controllers");
const { validateData, auth, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", auth, ctrlContacts.getAllContacts);

router.get("/:id", auth, isValidId, ctrlContacts.getById);

router.post(
  "/",
  auth,
  validateData(schemas.addSchema),
  ctrlContacts.addNewContact
);

router.delete("/:id", auth, isValidId, ctrlContacts.removeContactById);

router.put(
  "/:id",
  auth,
  isValidId,
  validateData(schemas.updateSchema),
  ctrlContacts.updateContactById
);

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validateData(schemas.updateStatusSchema),
  ctrlContacts.updateStatus
);
module.exports = router;
