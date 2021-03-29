const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});

const db = {};

db.sequelize= sequelize
db.Sequelize = Sequelize

db.restoran = require("./restoran.model")(sequelize, Sequelize);

module.exports = db;