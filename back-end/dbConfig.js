const mysql = require('mysql')

const dbPool = mysql.createPool({
    user: "root",
    password: "password",
    database: "tradecred",
    host: "localhost"
});

module.exports = dbPool;