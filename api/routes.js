const userRoutes = require("./security/routes/userRoutes");
const authRoutes = require("./security/routes/authRoutes");

exports.inscribeRoutes = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
};
