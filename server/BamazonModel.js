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

        let promise = new Promise((resolve, reject) => {

            database.query("SELECT * FROM departments")
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {});
        });

        database.close();
        return promise;
    }

    getDepartmentTotals() {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {
            database.query(`
            SELECT p.department_id as 'Department ID', department_name as 'Department Name',
                SUM(product_sales) as 'Total Sales', overhead_costs as 'Overhead Costs',
                (SUM(product_sales) - overhead_costs) as 'Total Profit'
                FROM products as p, departments as d
                WHERE p.department_id = d.department_id 
                GROUP BY p.department_id;
            `)
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {});
        });

        database.close();
        return promise;
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

    getProductsBelowQuantity(quantity) {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {

            database.query(`SELECT product_id, product_name, price, stock_quantity, product_sales
            FROM products
            WHERE stock_quantity < ${quantity}
            ORDER BY stock_quantity;`)
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

    updateProductQuantity(productID, quantity) {
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

    updateProductSale(productID, quantity, saleAmount) {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {
            database.query(`
            UPDATE products
            SET stock_quantity = ${quantity}, 
				product_sales = (product_sales + ${saleAmount})
            WHERE products.product_id = ${productID};
            `)
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


    addProduct(department_id, product_name, price, stock_quantity) {
        let database = new Database();

        let promise = new Promise((resolve, reject) => {

            database.query(`INSERT INTO products (department_id, product_name, price, stock_quantity)
            VALUES (${department_id}, "${product_name}", ${price}, ${stock_quantity});`)
                .then(rows => {
                    resolve("Added Product");
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