const { knex } = require("./db");

module.exports = {
  getAllPayments,
  getPaymentsFilteredDate,
  addNewPayment,
  deletePayment,
  getPaymentById,
  editPaymentById,
};

async function getAllPayments(userId) {
  return knex("Payments").select("*").where("userId", "=", userId);
}

async function getPaymentsFilteredDate(userId, type, startDate, endDate) {
  switch (type) {
    case "DateRange":
      return knex("Payments")
        .select("*")
        .where("userId", "=", userId)
        .whereBetween("payDate", [startDate, endDate]);
    case "date":
      return knex("Payments")
        .select("*")
        .where("userId", "=", userId)
        .where("payDate", "=", startDate);
    default:
      return knex("Payments").select("*").where("userId", "=", userId);
  }
}

async function addNewPayment(userId, payment) {
  const { payDate, amount, payMethod } = payment;
  return knex("Payments").insert({
    payDate: payDate,
    amount: amount,
    payMethod: payMethod,
    userId: userId,
  });
}

async function deletePayment(id) {
  return knex("Payments").where("paymentId", "=", id).del();
}

async function getPaymentById(id) {
  return knex("Payments").select("*").where("paymentId", "=", id).first();
}

async function editPaymentById(id, payment) {
  const { payDate, amount, payMethod } = payment;
  return knex("Payments").where("paymentId", "=", id).update({
    payDate,
    amount,
    payMethod,
  });
}
