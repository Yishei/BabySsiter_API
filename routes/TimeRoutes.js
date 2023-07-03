const Routes = require("express").Router();
const Controllers = require("../controllers/TimeControllers");
const { getTotalMoney_Time } = require("../controllers/getTotal");
const {
  getUserInfo,
  getUsersRate,
  updateClockdInStatus,
} = require("../controllers/userControllers");

Routes.get("/all", async (req, res, next) => {
  const userId = req.userId;
  try {
    let data = await Controllers.getTimeAllRcords(userId);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.post("/in", async (req, res, next) => {
  try {
    const { forDate, timeIn } = req.body;
    const userId = req.userId;
    const rate = await getUsersRate(userId);
    await Controllers.newTimeIn(userId, forDate, timeIn, rate[0].rate);
    const record = await Controllers.getTimeLastRecord(userId, "Id");
    const recrdId = record.Id;
    await updateClockdInStatus(userId, true, recrdId);
    let userInfo = await getUserInfo(userId);
    userInfo = userInfo[0];
    res.status(200).json({ ...userInfo });
  } catch (e) {
    console.error(e, "error");
    res.sendStatus(500);
  }
});

Routes.put("/out/:id", async (req, res, next) => {
  try {
    const recordId = req.params.id;
    const out = req.body.out;
    const userId = req.userId;
    await Controllers.TimeOut(recordId, out, "app");
    await updateClockdInStatus(userId, false, null);
    let userInfo = await getUserInfo(userId);
    userInfo = userInfo[0];
    res.status(200).json({ ...userInfo });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.put("/UpdateclockStatus/:state", async (req, res, next) => {
  try {
    let state = req.params.state;
    const userId = req.userId;
    await updateClockdInStatus(userId, state);
    let userInfo = await getUserInfo(userId);
    userInfo = userInfo[0];

    res.status(200).json({ ...userInfo });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/lestRecord", async (req, res, next) => {
  try {
    const userId = req.userId;
    let record = await Controllers.getTimeLastRecord(userId, "*");
    res.json(record);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/rate", async (req, res, next) => {
  try {
    let userId = req.userId;
    let rate = await getUsersRate(userId);

    res.json(rate);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.delete("/delete/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    await Controllers.deleteTimeRecord(id);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/total", async (req, res, next) => {
  const userId = req.userId;
  try {
    let total = await getTotalMoney_Time(userId);
    res.json(total);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.post("/newRecord", async (req, res, next) => {
  const userId = req.userId;
  const record = req.body;
  try {
    let rate = await getUsersRate(userId);
    rate = await rate[0].rate;
    await Controllers.addNewTimeRecord(userId, rate, record);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/byId/:id", async (req, res, nex) => {
  try {
    const id = req.params.id;
    const record = await Controllers.getTimeRecordById(id);
    res.json(record);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.put("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const record = req.body;
    await Controllers.editTimeRecordById(id, record);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
