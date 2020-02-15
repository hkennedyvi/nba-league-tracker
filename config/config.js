require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: "root",
    password: "1990",
    database: "basketball_db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql"
  },
  production: {
    use_env_variable: process.env.JAWSDB_URL,
    dialect: "mysql"
  }
};
