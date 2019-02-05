let mysql = require("mysql");

class Database {

  // hard code for now
  constructor() {
    let config = {
      host: "localhost",
      port: 3306,
      user: "plinck",
      password: "madipaul",
      database: "bamazon_db"
    };

    this.connection = mysql.createConnection(config);
  }

  // generic connect - this happends when its created so dont usually need to do
  connect() {
    this.connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + this.connection.threadId);
    });
  }

  // generic disconnect
  disconnect() {
    this.connection.end();
    console.log("disconnected");
  }

  query(sql, args, aCallback, errCallback) {
    this.connection.query(sql, args, (err, rows) => {
      if (err) {
        errCallback(err);
      }
      aCallback(rows);
    });
  }

}

module.exports = Database;

// // Test harness
// let database = new Database();
// database.query("SELECT * FROM products", "", (rows) => {
//   console.log(rows);
// });

// database.disconnect();