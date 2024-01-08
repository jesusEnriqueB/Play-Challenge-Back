const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { verifyResetPasswordToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character"),
  ],
  authController.loginUser
);
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Must be a valid email")],
  authController.forgotPassword
);

router.post(
  "/reset-password",
  [
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character"),
    body("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New password and confirm new password do not match");
      }
      return true;
    }),
  ],
  verifyResetPasswordToken,
  authController.resetPassword
);

module.exports = router;
