const Routes = require("express").Router();
const jwtUtils = require("../jwtUtils");

Routes.get("/token", async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let decodedObj = jwtUtils.verifyToken(token);
    let status = decodedObj.status;
    res.sendStatus(status);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
