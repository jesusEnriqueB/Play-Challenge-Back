const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", [body("email").isEmail()], authController.loginUser);

module.exports = router;
