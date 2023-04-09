const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateContact = require("../../middlewares");
const schema = require("../../schemas/schema");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getById);

router.post("/", validateContact(schema), ctrl.addNewContact);

router.delete("/:id", ctrl.removeContactById);

router.put("/:id", validateContact(schema), ctrl.updateContactById);

module.exports = router;
