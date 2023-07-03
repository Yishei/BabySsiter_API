const Routes = require("express").Router();
const {
  getAllNotifications,
} = require("../controllers/notificationContollers");

Routes.get("/all", async (req, res, next) => {
  try {
    const userId = req.userId;
    const notifications = await getAllNotifications(userId);
    res.json(notifications);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
