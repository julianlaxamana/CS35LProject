const jwt = require('jsonwebtoken');

// authentication middleware
exports.authMiddleware = function (req, res, next) {
  const token = req.headers.cookie.split("=")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
