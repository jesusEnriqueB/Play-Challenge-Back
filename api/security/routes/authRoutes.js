const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { verifyResetPasswordToken } = require("./../middlewares/authMiddleware"); // Asegúrate de importar el middleware

const router = express.Router();

router.post("/login", [body("email").isEmail()], authController.loginUser);
router.post(
  "/forgot-password",
  [body("email").isEmail()],
  authController.forgotPassword
);

router.post(
  "/reset-password",
  [
    body("newPassword").isLength({ min: 6 }),
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
