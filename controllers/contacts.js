const { Contact } = require("../models/contact");

const { ctrlWrapper, createError } = require("../helpers");
const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const findParams = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(findParams, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email");
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
  const { _id } = req.user;
  const contact = await Contact.findOne(
    { id, owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id name email");

  if (!contact) {
    throw createError(404, "Not found");
  }
  return res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
const addNewContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

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
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ id, owner: _id }, req.body, {
    new: true,
  });

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
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete(id, { owner: _id });
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
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ id, owner: _id }, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: `updated status of contact  with id:${id}`,
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
