let Database = require("./DatabasePromise");

class BAmazonModel {
    constructor() {}
    getProducts() {
        let database = new Database();

        database.query("SELECT * FROM products")
            .then(rows => {
                console.log(rows);
                // do something with the result
            })
            .catch(err => {});
        database.close();
    }

    getDepartments() {
        let database = new Database();

        database.query("SELECT * FROM departments")
            .then(rows => {
                console.log(rows);
            })
            .catch(err => {});

        database.close();
    }

    getProductsByDepartment() {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {

            database.query(`SELECT product_id, product_name, department_name, price, stock_quantity, product_sales
            FROM products, departments
            WHERE products.department_id = departments.department_id
            ORDER BY department_name;`)
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                });
        });

        database.close();
        return promise;
    }

    getProductByID(productID) {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {

            database.query(`SELECT product_id, product_name, price, stock_quantity
            FROM products
            WHERE products.product_id = ${productID};`)
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                });
        });

        database.close();
        return promise;
    }

    reduceProductQuantity(productID, quantity) {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {

            database.query(`UPDATE products
            SET stock_quantity = ${quantity}
            WHERE products.product_id = ${productID};`)
                .then(rows => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });

        database.close();
        return promise;
    }

}

module.exports = BAmazonModel;