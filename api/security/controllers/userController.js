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
      return res.status(200).json(userLogged);
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  }

  async getUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { users, totalCount } = await userService.getAllUsers(page, limit);

      const totalPages = Math.ceil(totalCount / limit);

      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const response = {
        users,
        pageInfo: {
          limit,
          currentPage: page,
          nextPage,
          prevPage,
          totalPages,
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  }

  async deleteUserByEmail(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const email = req.query.email;

      await userService.deleteUserByEmail(email);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  }
}

module.exports = new UserController();
