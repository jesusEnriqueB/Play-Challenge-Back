const userRoutes = require("./security/routes/userRoutes");

exports.inscribeRoutes = (app) => {
  app.use("/api/users", userRoutes);
};
