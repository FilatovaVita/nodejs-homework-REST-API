const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers/users");

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("schemas/schema");
const { validateData } = require("middlewares/validation");
const { auth } = require("middlewares/auth");

router.post("/register", validateData(registerSchema), ctrl.userSignup);
router.post("/login", validateData(loginSchema), ctrl.userLogin);
router.get("/logout", auth, ctrl.userLogout);
router.get("/current", auth, ctrl.userCurrent);
router.patch(
  "/",
  auth,
  validateData(updateSubscriptionSchema),
  ctrl.getAllUsers
);

module.exports = router;
