const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateData } = require("middlewares/validation");
const { auth } = require("middlewares/auth");
const {
  addSchema,
  updateSchema,
  updateStatusSchema,
} = require("../../schemas/schema");
const isValidId = require("../../middlewares/isValid");

router.get("/", auth, ctrl.getAllContacts);

router.get("/:id", auth, isValidId, ctrl.getById);

router.post("/", auth, validateData(addSchema), ctrl.addNewContact);

router.delete("/:id", auth, isValidId, ctrl.removeContactById);

router.put(
  "/:id",
  auth,
  isValidId,
  validateData(updateSchema),
  ctrl.updateContactById
);

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validateData(updateStatusSchema),
  ctrl.updateStatus
);
module.exports = router;
