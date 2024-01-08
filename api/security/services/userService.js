const { User } = require("../../db/index");
const bcrypt = require("bcrypt");

class UserService {
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw new Error("Error on get user by email");
    }
  }
  async createUser(email, password, fullName) {
    const existUser = await this.getUserByEmail(email);
    if (existUser) {
      throw new Error("User exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    return newUser.get();
  }

  async updatePassword(userId, newPassword) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
  }
}

module.exports = new UserService();
