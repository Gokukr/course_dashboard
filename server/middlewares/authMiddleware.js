const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
