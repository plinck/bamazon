"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");

// Render data/rows to the console
// Made in generic so any set of rows can be neatly displayed.
// Pretty nice since I can use this one fucntion for ALL display data coming from ANY table
// To make the header and data line up, I find maximum val for each column and make them all that size
function renderData(rows) {
    const columnWidths = {};

    // first, get header (keys) length and set as default
    // note keys in array of keys so the name is keys[idx]
    let keys = (rows['0'] != undefined) ? Object.keys(rows['0']) : {};
    for (let i in keys) {
        columnWidths[keys[i]] = keys[i].length;
    }

    // Calculate column width based on max row size for each column
    rows.forEach(row => {
        for (let key in row) {
            let str = row[key].toString();
            columnWidths[key] = Math.max(columnWidths[key], str.length);
        }
    });

    // display the header
    let headerText = "|";
    for (let key in columnWidths) {
        headerText += " " + key + " ".repeat(columnWidths[key] - key.length) + " |";
    }
    console.log();
    console.log(headerText.toUpperCase());

    headerText = "|";
    for (let key in columnWidths) {
        headerText += " " + "-".repeat(key.length) + "-".repeat(columnWidths[key] - key.length) + " |";
    }
    console.log(headerText.toUpperCase());

    // Now, print the data
    rows.forEach(row => {
        let rowText = "|";
        for (let key in row) {
            let str = row[key].toString();
            rowText += " " + row[key] + " ".repeat(columnWidths[key] - str.length) + " |";
        }
        console.log(rowText);

    });
}

// Customer : Buy the product
function buyProduct(product_id, quantity, completedWorkCallback) {
    let bAmazonModel = new BAmazonModel();
    let totalSale;
    let newQuantity;

    bAmazonModel.getProductByID(product_id).then(rows => {
        if (rows[0].stock_quantity >= quantity) {
            totalSale = quantity * rows[0].price;
            newQuantity = rows[0].stock_quantity - quantity;

            bAmazonModel.reduceProductQuantity(product_id, newQuantity)
                .then(() => {
                    totalSale = totalSale.toFixed(2);
                    console.log(`You bought ${quantity} x ${rows[0].product_name} totalling: $${totalSale}`);
                    console.log(`There are now ${newQuantity} x ${rows[0].product_name} left`);
                    completedWorkCallback();
                })
                .catch(err => {
                    console.log(`Error updating stock quantity ${err}.  Sale Rejected`);
                });
        } else {
            console.log(`Stock is ${rows[0].stock_quantity} of ${rows[0].product_name}.  Cant sell you: ${quantity}`);
            completedWorkCallback();
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
        renderData(rows);
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
    renderData(rows);

    const question = [{
            name: 'product_id',
            message: '\nWhat product you like to buy?'
        },
        {
            name: 'quantity',
            message: '\nHow Many would you like to buy?'
        },
        {
            name: 'more',
            message: 'Add More (y=yes)?'
        }
    ];

    let answer = await inquirer.prompt(question);
    let product_id = parseInt(answer.product_id);
    let quantity = parseInt(answer.quantity);

    buyProduct(product_id, quantity, () => {
        if (answer.more != undefined && answer.more == 'y') customerMenu();
    });
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
            name: 'more',
            message: 'Add More (y=yes)?'
        }
    ];

    inquirer.prompt(promptInfo).then(answer => {
        let department_id = parseInt(answer.department_id);

        let bAmazonModel = new BAmazonModel();
        bAmazonModel.addProduct(department_id, answer.product_name, answer.price, answer.stock_quantity).then(() => {
            console.log(`Added Stock to ${answer.product_name}`);
            if (answer.more != undefined && answer.more == 'y') addNewProduct(departments);
        }).catch(errc => {
            console.log(`Error adding product: ${err}`);
            if (answer.more != undefined && answer.more == 'y') addNewProduct(departments);
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
            break;
    }
}

//
mainMenu();