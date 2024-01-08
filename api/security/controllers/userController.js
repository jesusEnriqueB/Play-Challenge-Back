const { UserCreated } = require("../serializers/userSerializers");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");

class UserController {
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, fullName } = req.body;

      const user = await userService.createUser(email, password, fullName);
      const userLogged = new UserCreated(user);
      return res.status(201).json(userLogged);
    } catch (error) {
      console.error("Error on create user:", error);
      return res.status(500).json({ error: `Internal Server Error ${error}` });
    }
  }
}

module.exports = new UserController();
