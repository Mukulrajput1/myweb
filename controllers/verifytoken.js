// Verify token middleware

const jwt = require("jsonwebtoken");

exports.verifyToken = function (req, res, next) {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });
    console.log("token",token, process.env.JWT_SECRET)
    // try {
      // console.log(token)
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    // } catch (err) {
    //   res.status(400).json({ message: "Invalid token" });
    // }
  };