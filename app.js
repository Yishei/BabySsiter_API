const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const TimeRoutes = require("./routes/TimeRoutes");
const PayRoutes = require("./routes/payRoutes");
const userRoutes = require("./routes/userRoutes");
const VerifyRoute = require("./routes/verifyRoute");
//const SmsRoutes = require("./routes/smsRoutes");
const EmailRoutes = require("./routes/emailRoutes");
const NotificationRoutes = require("./routes/notificationRoutes");
const SettingsRoutes = require("./routes/settingsRoutes");
const { authenticateToken } = require("./controllers/tokenVerification");
const port = process.env.PORT || 3000;

app.use(
  cors({
    exposedHeaders: ["token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/verify", VerifyRoute);
app.use("/email", EmailRoutes);
//app.use("/sms", SmsRoutes);
app.use(authenticateToken);
app.use("/time", TimeRoutes);
app.use("/pay", PayRoutes);
app.use("/settings", SettingsRoutes);
app.use("/notification", NotificationRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
