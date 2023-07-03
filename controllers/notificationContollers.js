const { knex } = require("./db");

module.exports = {
  getAllNotifications,
};

async function getAllNotifications(userId) {
  return knex("Notifications").where("userId", "=", userId);
}
