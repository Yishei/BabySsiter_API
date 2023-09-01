const { knex } = require("./db");

module.exports = {
  lookupUser,
  createUser,
  updateUserInfo,
  getUserInfo,
  getUsersRate,
  updateClockdInStatus,
};

async function lookupUser(userName, password) {
  try {
    const userTrimd = userName.trim().toLowerCase();
    const passTrimd = password.trim();
    const user = await knex("Users").where("Email", "=", userTrimd).first();

    if (user) {
      if (user.Password === passTrimd) {
        return user;
      } else {
        return { error: "Invalid password" };
      }
    } else {
      return { error: "User not found" };
    }
  } catch (e) {
    throw new Error(e);
  }
}



async function createUser(userInfo) {
  const { fullName, email, password, phone, rate } = userInfo;
  try {
    const emailTrimd = email.trim().toLowerCase();
    const phoneTrimd = phone.trim();
    const isEmail = await knex("Users").where("Email", "=", emailTrimd).first();
    const isUser = await knex("Users").where("phone", "=", phoneTrimd).first();

    if (isUser || isEmail) {
      return { error: "User already exists" };
    }

    return knex("Users").insert({
      fullName,
      Email: email,
      password,
      Phone: phone,
      Rate: rate,
      CreatedAt: new Date(),
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

async function updateUserInfo(userId, userInfo) {
  const { fullName, Email, phone, Password, Rate } = userInfo;
  return knex("Users").where("Id", "=", userId).update({
    fullName,
    Email,
    phone,
    Password,
    Rate,
  });
}



async function getUserInfo(userId) {
  return knex.select("*").where("Id", "=", userId).from("Users");
}


async function getUsersRate(userId) {
  return knex("users").select("rate").where("Id", "=", userId);
}

async function updateClockdInStatus(userId, status, ClockdInId) {
  return knex("users")
    .where("Id", "=", userId)
    .update({
      isClockdIn: status,
      ClockdInId: status === true ? ClockdInId : null,
    });
}
