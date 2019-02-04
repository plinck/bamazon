//database.js
var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool({
        host     : 'localhost',
        user     : 'plinck',
        password : 'madipaul',
        database : 'auctionDB'
      });
      return pool;
    }
};

// To Call
var db = require('./database.js');
var pool = db.getPool(); // re-uses existing if already created or creates new one
pool.getConnection(function(err, connection) {
   // don't forget to check error
   connection.query('select 1+1', function(err, rows) {
     // don't forget to check error
     // ...
     // use your data - response from mysql is in rows    
   });
});