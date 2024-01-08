const authService = require("../services/authService");
const { validationResult } = require("express-validator");
const { UserLogged } = require("./../serializers/userSerializers");

class AuthController {
  async loginUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;

      const { user, token } = await authService.loginUser(email, password);
      const userLogged = new UserLogged({ ...user.get(), token });
      res.status(200).json(userLogged);
    } catch (error) {
      res.status(401).json({ error: `${error}` });
    }
  }
}

module.exports = new AuthController();
