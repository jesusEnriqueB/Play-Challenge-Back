const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const {verifyAccessToken} = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: FullName of the user
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Password of user
 *       example:
 *         id: d5fE_asz
 *         fullName: Jesus Enrique Balam Batun
 *         email: jesus0.balambatun@gmail.com
 *         password: 123456!
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user list.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *     responses:
 *       200:
 *         description: Success response, list of user.
 *       500:
 *         description: Internal server error.
 */
router.get(
    "/",
    verifyAccessToken,
    userController.getUsers
)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create new user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success response, new user.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character"),
    body("fullName").isLength({ min: 6 }).withMessage("fullName must be at least 6 character"),
  ],
  userController.createUser
);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete user.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: email of user to delete.
 *     responses:
 *       200:
 *         description: Success response, delete user.
 *       500:
 *         description: Internal server error.
 */
router.delete(
    "/",
    userController.deleteUserByEmail
);

module.exports = router;
