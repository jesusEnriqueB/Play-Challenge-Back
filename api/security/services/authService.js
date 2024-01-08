const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("./userService");
const { sendResetPasswordEmail } = require("./../../mailer/mailer");

class AuthService {
  async createAccessToken(user) {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
  }

  async createResetPasswordToken(user) {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.RESET_PASSWORD_SECRET,
      {
        expiresIn: process.env.RESET_PASSWORD_EXPIRE,
      }
    );
  }

  async loginUser(email, password) {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = await this.createAccessToken(user);

    return { user, token };
  }

  async forgotPassword(email) {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = await this.createResetPasswordToken(user);
    await sendResetPasswordEmail(email, resetToken);
  }
}

module.exports = new AuthService();
