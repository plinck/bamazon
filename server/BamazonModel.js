let Database = require("./DatabasePromise");

class BAmazonModel {
    constructor() {
    }
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
    
        database.query(`SELECT department_name, product_name, price, stock_quantity, product_sales
        FROM products, departments
        WHERE products.department_id = departments.department_id
        ORDER BY department_name;`)
            .then(rows => {
                console.log(rows);
            })
            .catch(err => {});
    
        database.close();
    }    
}

module.exports = BAmazonModel;
