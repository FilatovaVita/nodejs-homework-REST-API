const { Contact } = require("../models/contact");

const { ctrlWrapper, createError } = require("../helpers");
const getAllContacts = async (req, res) => {
  const result = await Contact.find({});
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
  const result = await Contact.findById(id);

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
  const result = await Contact.create(req.body);

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
  const result = await Contact.findByIdAndUpdate(id, req.body);

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
  const result = await Contact.findByIdAndDelete(id);
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

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: `updated status of contact ${result.name} with id:${id}`,
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
  updateStatus: ctrlWrapper(updateStatus),
};
