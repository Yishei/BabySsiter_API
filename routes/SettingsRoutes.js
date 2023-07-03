const Routes = require("express").Router();
const {updateUserInfo, getUserInfo} = require("../controllers/userControllers");

Routes.put("/updateInfo", async (req, res, next) => {
  try {
    const userId = req.userId;
    await updateUserInfo(userId, req.body);
    let userInfo = await getUserInfo(userId);
    userInfo = userInfo[0];
    res.status(200).json({ ...userInfo });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/userInfo", async (req, res, next) => {
  try {
    const userId = req.userId;
    let userInfo = await getUserInfo(userId);
    res.status(200).json({ ...userInfo });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
