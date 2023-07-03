const { knex } = require("./db");

module.exports = {
  getTimeAllRcords,
  newTimeIn,
  TimeOut,
  getTimeLastRecord,
  deleteTimeRecord,
  addNewTimeRecord,
  getTimeRecordById,
  editTimeRecordById,
};


async function getTimeAllRcords(userId) {
  return knex.select("*").where("UserId", "=", userId).from("TimeCard");
}


async function newTimeIn(userId, forDate, timeIn, rate, Source = "app") {
  return knex("TimeCard").insert({
    ForDate: forDate,
    timeIn: timeIn,
    UserId: userId,
    InSource: Source,
    Rate: rate,
  });
}


async function TimeOut(timeInID, timeOut, Source) {
  return knex("TimeCard").where("Id", "=", timeInID).update({
    TimeOut: timeOut,
    OutSource: Source,
  });
}


async function getTimeLastRecord(userId, select) {
  return knex("TimeCard")
    .select(select)
    .where("UserId", "=", userId)
    .orderBy("id", "desc")
    .limit(1)
    .first();
}


async function addNewTimeRecord(userId, rate, record) {
  const { forDate, timeIn, timeOut, InSource, OutSource } = record;
  return knex("TimeCard").insert({
    forDate: forDate,
    TimeIn: timeIn,
    TimeOut: timeOut,
    UserId: userId,
    InSource: InSource,
    OutSource: OutSource,
    Rate: rate,
  });
}


async function deleteTimeRecord(id) {
  return knex("TimeCard").where("Id", "=", id).del();
}




async function getTimeRecordById(id) {
  return knex("TimeCard").select("*").where("Id", "=", id).first();
}


async function editTimeRecordById(id, record) {
  return knex("TimeCard").where("Id", "=", id).update({
    ForDate: record.forDate,
    TimeIn: record.timeIn,
    TimeOut: record.timeOut,
  });
}
