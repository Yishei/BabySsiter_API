const jwtUtils = require("../jwtUtils");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  let decodedObj = jwtUtils.verifyToken(token);
  let status = decodedObj.status;
  if (status === 200) {
    req.userId = decodedObj.decoded.userId;
    console.log("userId: ", req.userId);
  } else {
    return res.sendStatus(status);
  }
  next();
}

module.exports = {
  authenticateToken,
};
