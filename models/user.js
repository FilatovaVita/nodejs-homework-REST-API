const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
});
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
};
