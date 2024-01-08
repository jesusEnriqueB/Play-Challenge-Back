const express = require("express");
const { body } = require('express-validator');
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("fullName").isString(),
  ],
  userController.createUser
);

module.exports = router;
