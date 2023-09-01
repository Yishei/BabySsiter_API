const { knex } = require("./db");
const otpGenerator = require("otp-generator");
const { transporter, emailInfo } = require("./email");


module.exports = {
    hendelOtp,
    varifyOtp,
    };


async function hendelOtp(email) {
    try {
        let user = await lookupUserIdByEmail(email);
        const { Id, Email } = user;
        console.log("userId", user);
        const otp = generateOtp();
        await setOtp(Id, otp);
        transporter.sendMail(emailInfo(Email, otp), function (error, info) {
            if (error) {
                console.log(error);
                throw new Error(error);
            }
        });
        return otp;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}



async function lookupUserIdByEmail(email) {
  try {
    const emailTrimd = email.trim().toLowerCase();
    const user = await knex("Users").where("Email", "=", emailTrimd).first();

    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    throw new Error(e);
  }
}
function generateOtp() {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
    });
}

async function setOtp(userId, otp) {
    return knex("Users").where("Id", "=", userId).update({
      OTP: otp,
    });
  }
  
async function varifyOtp(userId, otp) {
    const user = await knex("Users").where("Id", "=", userId).select("OTP");
    if (user[0].OTP === otp) {
        await remveOtp(userId);
        return true;
    } else {
        return false;
    }
}

  async function remveOtp(userId) {
    return knex("Users").where("Id", "=", userId).update({
      OTP: null,
    });
  }