const { Contact } = require("../models/contact");

const { ctrlWrapper, createError } = require("../helpers");
const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id });
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
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError(404, "Not found");
  } else if (String(contact.owner) === String(_id)) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  }
};
const addNewContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create(...req.body, { owner: _id });

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
  const result = await Contact.findByIdAndUpdate(id, req.body, { owner: _id });

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
  const result = await Contact.findByIdAndDelete(id, { owner: _id });
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
  const { _id } = req.user;
  const result = await Contact.findByIdAndUpdate(
    id,
    { owner: _id, favorite },
    { new: true }
  );
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
