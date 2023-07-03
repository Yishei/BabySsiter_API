const Routes = require("express").Router();

const { transporter, mailOptions } = require("../controllers/email");

Routes.get("/sendEmail", async (req, res, next) => {
    try {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Email sent: " + info.response);
                res.sendStatus(200);
            }
        }
        );
    } catch (e) {
        console.error(e);
        res.sendStatus(500);

    }
});

module.exports = Routes;
