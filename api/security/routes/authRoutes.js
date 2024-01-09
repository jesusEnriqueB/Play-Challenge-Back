const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { verifyResetPasswordToken } = require("./../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login of user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                email: jesus.balam0@gmail.com
 *                password: 123456!
 *     responses:
 *       200:
 *         description: Success response, user logged.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request an email to recovery password.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                email: jesus.balam0@gmail.com
 *     responses:
 *       200:
 *         description: Success response, Request of recovery success.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Must be a valid email")],
  authController.forgotPassword
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Change the password of user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                newPassword: 1234567!
 *                confirmNewPassword: 1234567!
 *     responses:
 *       200:
 *         description: Success response, password changed.
 *       500:
 *         description: Internal server error.
 */
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
