const express = require("express");
const router = express.Router();

const { ctrlAuth } = require("../../controllers");
const { schemas } = require("../../models/user");
const { validateData, auth, upload } = require("../../middlewares");

router.post(
  "/register",
  validateData(schemas.registerSchema),
  ctrlAuth.userSignup
);
router.post("/login", validateData(schemas.loginSchema), ctrlAuth.userLogin);
router.post("/logout", auth, ctrlAuth.userLogout);
router.get("/current", auth, ctrlAuth.userCurrent);
router.patch(
  "/",
  auth,
  validateData(schemas.updateSubscriptionSchema),
  ctrlAuth.updateUsers
);
router.patch("/avatars", auth, upload.single("avatar"), ctrlAuth.userAvatar);

router.get("/verify/:verificationToken", ctrlAuth.verifyEmail);
router.post(
  "/verify/",
  validateData(schemas.emailSchema),
  ctrlAuth.resendVerifyEmail
);

module.exports = router;
