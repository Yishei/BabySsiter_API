require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

function signToken(payload) {
  return jwt.sign(payload, privateKey, {
    expiresIn: "20m",
    algorithm: "RS256",
  });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey);
    // Token verification successful
    return {
      decoded: decoded,
      status: 200,
    };
  } catch (error) {
    return {
      status: 401,
    };
  }
}


module.exports = {
  signToken,
  verifyToken,
};
