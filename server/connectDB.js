const mysql = require('mysql')

// connect to mySql server
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacationsdb"
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("connected to MySql")
})

module.exports = db