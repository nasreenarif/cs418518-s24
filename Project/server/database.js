const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",//localhost
  user: "root",
  password: "",
  database: "course_ad",
});

module.exports=connection;
