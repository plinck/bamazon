"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");

// Render Products to the console
function renderProducts(rows) {
    console.log(`\n----------------------------------------------------------------------\n`);

    for (let i in rows) {
        //console.log(row);
        let row = rows[i];
        console.log(row.product_id, row.product_name, row.department_name, row.price, row.stock_quantity, row.product_sales);
    }
    console.log(`\n----------------------------------------------------------------------\n`);

}

// Render Departments to the console
function renderDepartments(rows) {
    console.log(`\n----------------------------------------------------------------------\n`);
    console.log(`DEPARTMENTS`);
    for (let i in rows) {
        //console.log(row);
        let row = rows[i];
        console.log(row.department_id, row.department_name, row.overhead_costs);
    }
    console.log(`\n----------------------------------------------------------------------\n`);
}

// Customer : Buy the product
async function buyProduct(product_id, quantity) {
    let bAmazonModel = new BAmazonModel();

    bAmazonModel.getProductByID(product_id).then(rows => {
        if (rows[0].stock_quantity >= quantity) {
            let totalSale = quantity * rows[0].price;
            let newQuantity = rows[0].stock_quantity - quantity;

            bAmazonModel.reduceProductQuantity(product_id, newQuantity)
                .then(() => {
                    totalSale = totalSale.toFixed(2);
                    console.log(`You bought ${quantity} x ${rows[0].product_name} totalling: $${totalSale}`);
                    console.log(`There are now ${newQuantity} x ${rows[0].product_name} left`);
                })
                .catch(err => {
                    console.log(`Error updating stock quantity ${err}.  Sale Rejected`);
                });
        } else {
            console.log(`Stock is ${rows[0].stock_quantity} of ${rows[0].product_name}.  Cant sell you: ${quantity}`);
        }
    }).catch(err => {
        console.log(`Error finding product with id: ${product_id}`);
    });
}

// View Departments
async function getDepartments() {
    let bAmazonModel = new BAmazonModel();

    try {
        let rows = await bAmazonModel.getDepartments();
        renderDepartments(rows);
        let departmentIDarray = [];
        for (let i in rows) {
            departmentIDarray.push(`${rows[i].department_id}`);
        }
        return departmentIDarray;
    } catch (err) {
        console.error(`Error trying to insert ${err}`);
    }
}

// Customer menu
async function customerMenu() {
    let bAmazonModel = new BAmazonModel();

    // use await since you cant ask them the question without showing them choices
    let rows = await bAmazonModel.getProductsByDepartment();
    renderProducts(rows);

    const question = [{
            name: 'product_id',
            message: '\nWhat product you like to buy?'
        },
        {
            name: 'quantity',
            message: '\nHow Many would you like to buy?'
        }
    ];

    let answer = await inquirer.prompt(question);
    let product_id = parseInt(answer.product_id);
    let quantity = parseInt(answer.quantity);

    buyProduct(product_id, quantity);
}

// Manager : add new product
function addNewProduct(departments) {
    let promptInfo = [{
            name: 'product_name',
            message: 'Product Name?'
        },
        {
            name: 'stock_quantity',
            message: 'How Many?'
        }, {
            name: 'price',
            message: 'Price?'
        }, {
            type: 'list',
            name: 'department_id',
            message: 'Department ID?',
            choices: departments
        },
        {
            name: 'done',
            message: 'Add More (y=yes)?'
        }
    ];

    inquirer.prompt(promptInfo).then(answer => {
        let department_id = parseInt(answer.department_id);

        let bAmazonModel = new BAmazonModel();
        bAmazonModel.addProduct(department_id, answer.product_name, answer.price, answer.stock_quantity).then( () => {
            console.log(`Added Stock to ${answer.product_name}`);
            if (answer.done != undefined && answer.done == 'y') addNewProduct(departments);
        }).catch(errc => {
            console.log(`Error adding product: ${err}`);
            if (answer.done != undefined && answer.done == 'y') addNewProduct(departments);
        });
    });
}

// Manager : add to inventory
function addToInventory() {
    let promptInfo = [{
        name: 'product_id',
        message: 'Product ID?'
    }, {
        name: 'qty',
        message: 'How Many?'
    }];

    inquirer.prompt(promptInfo).then(answer => {
        console.log(answer.product_id, answer.qty);
    });
}

// Manager menu
async function managerMenu() {
    const question = {
        type: 'list',
        name: 'managerMenu',
        message: '\n\nWhat do you want to do?',
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    };

    let answer = await inquirer.prompt(question);

    switch (answer.managerMenu) {
        case "View Products":
            console.log(answer.managerMenu);
            break;
        case "View Low Inventory":
            console.log(answer.managerMenu);
            break;
        case "Add to Inventory":
            console.log(answer.managerMenu);
            addToInventory();
            break;
        case "Add New Product":
            // get the departments to maintain ref integrity when adding product
            let departments = await getDepartments();
            addNewProduct(departments);
            break;
        default:
            break;
    }
}

// Main menu
async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: '\n\nWhat view do you want?',
        choices: ["customer", "manager", "supervisor", "QUIT"]
    };

    let bAmazonModel = new BAmazonModel();

    let answer = await inquirer.prompt(question);

    switch (answer.mainMenu) {
        case "customer":
            console.log(answer.mainMenu);
            customerMenu();
            break;
        case "manager":
            console.log(answer.mainMenu);
            managerMenu();
            break;
        case "supervisor":
            console.log(answer.mainMenu);
            break;
        case "QUIT":
            console.log(answer.mainMenu);
            done = true;
            break;
    }
}

//
mainMenu();