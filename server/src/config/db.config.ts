import { Dialect } from "sequelize";

export default module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sqlPw123!",
  DB: "vReqDB",
  DIALECT: <Dialect>"mysql",
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
