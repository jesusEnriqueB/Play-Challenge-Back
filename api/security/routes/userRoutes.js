const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const {verifyAccessToken} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get(
    "/",
    verifyAccessToken,
    userController.getUsers
)

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character"),
    body("fullName").isLength({ min: 6 }).withMessage("fullName must be at least 6 character"),
  ],
  userController.createUser
);

router.delete(
    "/",
    userController.deleteUserByEmail
);

module.exports = router;
