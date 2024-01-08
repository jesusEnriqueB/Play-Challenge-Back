const { User } = require("../../db/index");
const bcrypt = require("bcrypt");

class UserService {
  async createUser(email, password, fullName) {
    const existUser = await User.findOne({ where: { email } });
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
}

module.exports = new UserService();
