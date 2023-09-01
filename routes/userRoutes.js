const Routes = require("express").Router();
const { lookupUser, createUser } = require("../controllers/userControllers");
const jwtUtils = require("../jwtUtils");

// POST /login
Routes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRecord = await lookupUser(username, password);
    if (userRecord && !userRecord.error) {
      // Authenticate the user and generate a payload
      const payload = {
        userId: userRecord.Id,
        username: userRecord.Email,
      };

      // Sign the token using the private key
      const token = jwtUtils.signToken(payload);

      res.setHeader("token", token);
      res.status(200).json({ ...userRecord });
    } else if (userRecord && userRecord.error === "Invalid password") {
      // Invalid password
      res.status(401).json({ message: "Invalid password" });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occurred during the database lookup
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// POST /singup
Routes.post("/singup", async (req, res, next) => {
  const userInfo = req.body;
  try {
    let resMessage = await createUser(userInfo);
    if (resMessage.error) {
      res.status(409).json({ message: "alredy a user" });
    } else {
      res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
