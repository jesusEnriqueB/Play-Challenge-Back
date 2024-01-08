const authService = require("../services/authService");
const userService = require("../services/userService")
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
      return res.status(401).json({ error: `${error}` });
    }
  }

  async forgotPassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      await authService.forgotPassword(email);

      return res.status(200).json({ message: "Email sent for password reset" });
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  }

  async resetPassword(req, res) {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { newPassword } = req.body;

      const userId = req.authUser.userId;

      await userService.updatePassword(userId, newPassword);
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
  }
}

module.exports = new AuthController();
