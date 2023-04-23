const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = createError(400, `format of this id:${id} is not correct`);
    next(error);
  }
  next();
};

module.exports = isValidId;
