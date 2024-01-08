const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("./userService");

class AuthService {
  async loginUser(email, password) {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    return { user, token };
  }
}

module.exports = new AuthService();
