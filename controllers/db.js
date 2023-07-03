const Knex = require("knex");
require("dotenv").config();

module.exports = {
  knex: Knex({
    client: "mssql",
    connection: {
      server: process.env.DB_SERVER,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE,
      options: {
        port: Number(process.env.DB_PORT),
      },
    },
  }),
};
