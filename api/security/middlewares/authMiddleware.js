const jwt = require("jsonwebtoken");

/**
 * Verify that token provided on login flow is correct.
 *
 * @param req - request.
 * @param res - response.
 * @param next - next action.
 */
const verifyAccessToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Need Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired Token" });
  }
};

/**
 * Verify that token provided on reset password flow is correct.
 *
 * @param req - request.
 * @param res - response.
 * @param next - next action.
 */
const verifyResetPasswordToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Need Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    req.authUser = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or expired Token" });
  }
};

module.exports = { verifyAccessToken, verifyResetPasswordToken };
