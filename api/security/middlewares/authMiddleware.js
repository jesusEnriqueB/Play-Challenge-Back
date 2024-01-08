const jwt = require("jsonwebtoken");

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
    return res.status(401).json({ error: "Invalid or expired Token" });
  }
};

module.exports = { verifyAccessToken, verifyResetPasswordToken };
