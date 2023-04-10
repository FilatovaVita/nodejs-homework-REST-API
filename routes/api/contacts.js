const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateContact = require("../../middlewares");

const { addSchema, updateSchema } = require("../../schemas/schema");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getById);

router.post("/", validateContact(addSchema), ctrl.addNewContact);

router.delete("/:id", ctrl.removeContactById);

router.put("/:id", validateContact(updateSchema), ctrl.updateContactById);
router.delete("/:id", ctrl.removeContactById);

module.exports = router;
