const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new Dotenv(
      key: process.env.APIKEY
  )]
};
