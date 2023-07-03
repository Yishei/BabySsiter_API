const moment = require("moment");
const { getTimeAllRcords } = require("./TimeControllers");
const { getAllPayments } = require("./payControllers");

async function getTotalMoney_Time(userId) {
  try {
    const TimeRecords = await getTimeAllRcords(userId);
    const payments = await getTotalPay_Balance(userId);
    const moneyAndTime = TimeRecords.reduce(
      (acc, record) => {
        if (record.TimeOut === null) {
          return {
            money: acc.money,
            time: acc.time,
          };
        }
        const timeIn = moment(record.TimeIn);
        const timeOut = moment(record.TimeOut);

        const rate = record.Rate;
        const duration = timeOut.diff(timeIn);
        const recordTotal = (duration / 1000 / 60 / 60) * rate;

        return {
          money: acc.money + recordTotal,
          time: acc.time + duration,
        };
      },
      { money: 0, time: 0 }
    );

    const hours = Math.floor(moneyAndTime.time / (60 * 60 * 1000));
    const minutes = Math.floor(
      (moneyAndTime.time % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((moneyAndTime.time % (60 * 1000)) / 1000);
    const timeFormated = `${hours}:${minutes}:${seconds}`;

    return {
      money: moneyAndTime.money,
      time: timeFormated,
      payments: payments,
      balance: moneyAndTime.money - payments,
    };
  } catch (err) {
    throw new Error();
  }
}

async function getTotalPay_Balance(userId) {
  let records = await getAllPayments(userId);
  const paymentTotal = records.reduce((acc, record) => {
    const amount = record.amount;
    return acc + amount;
  }, 0);

  return paymentTotal;
}

module.exports = {
  getTotalMoney_Time,
};
