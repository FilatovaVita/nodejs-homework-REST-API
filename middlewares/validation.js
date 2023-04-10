const { createError } = require("../helpers");

const validateContact = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = () => {
        switch (req.method) {
          case "POST":
            return "Missing required  field";
          case "PUT":
            return "Missing  field";
          default:
        }
      };
      next(createError(400, errorMessage()));
    }
    next();
  };
};

module.exports = validateContact;
