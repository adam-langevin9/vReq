module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sqlPw123!",
  DB: "vReqDB",
  DIALECT: "mysql",
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
