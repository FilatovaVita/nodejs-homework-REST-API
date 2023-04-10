const contactOperations = require("../models/contacts");

const { ctrlWrapper, createError } = require("../helpers");
const getAllContacts = async (req, res) => {
  const result = await contactOperations.getListContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.getContactById(id);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const addNewContact = async (req, res) => {
  const result = await contactOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};
const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.updateContact(id, req.body);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "updated success",
    data: {
      result,
    },
  });
};
const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.removeContact(id);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
};