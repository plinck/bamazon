const mysql = require('mysql');

class Database {
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
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {          
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    close() {
        this.connection.end();
    }
}

module.exports = Database;

// test
let database = new Database();

database.query("SELECT * FROM products")
    .then(rows => {
        console.log(rows);
        // do something with the result
    });
database.close();