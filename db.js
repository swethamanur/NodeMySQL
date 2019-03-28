const mysql = require("mysql");

//connecting to db and creating login
const db = mysql.createConnection({
  host: "localhost",
  user: "swetha",
  password: "secret123"
});

db.connect(err => {
  if (err) throw err;
  console.log("MTSQL created...");
});

module.exports = {
  db
};
