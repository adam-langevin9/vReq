import dotenv from "dotenv";
dotenv.config();

type env = "development" | "test" | "production";
const USE_ENV_VARIABLE: env = "development";

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

const test = { username: "root", password: undefined, database: "database_test", host: "127.0.0.1", dialect: "mysql" };

const production = {
  username: "root",
  password: undefined,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

const configs = {
  development,
  test,
  production,
};

export default module.exports = configs[USE_ENV_VARIABLE];
