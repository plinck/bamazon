var mysql = require("mysql");

class AuctionDB {

  // hard code for now
  constructor() {
    let config = {host: "localhost",
    port: 3306,
    user: "plinck",
    password: "madipaul",
    database: "auctionDB"};

    this.connection = mysql.createConnection( config );
}

  // generic connect
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

  // connect and get to test
  getAuctionItems() {
    this.connection.query("SELECT * FROM auctionItems", function (err, res) {
        if (err) throw err;
        console.log(res);
      });
  }
}

module.exports = AuctionDB;

// Test harness
let auctionDB = new AuctionDB;
auctionDB.getAuctionItems();
auctionDB.disconnect();
