const Routes = require("express").Router();
const Controllers = require("../controllers/payControllers");

Routes.get("/all", async (req, res, next) => {
  try {
    const userId = req.userId;
    const payments = await Controllers.getAllPayments(userId);
    res.json(payments);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.post("/dateFiltered", async (req, res, next) => {
  console.log(req.body);
  try {
    const userId = req.userId;
    const { type, startDate, endDate } = req.body;
    const payments = await Controllers.getPaymentsFilteredDate(
      userId,
      type,
      startDate,
      endDate
    );
    res.json(payments);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


Routes.post("/newPayment", async (req, res, next) => {
  try {
    const userId = req.userId;
    const payment = req.body;
    await Controllers.addNewPayment(userId, payment);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Controllers.deletePayment(id);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.get("/byId/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = await Controllers.getPaymentById(id);
    res.json(payment);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.put("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = req.body;
    await Controllers.editPaymentById(id, payment);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
