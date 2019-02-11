"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");
const render = require("./render.js")

// Manager : View Departments
async function getDepartments() {
    let bAmazonModel = new BAmazonModel();

    try {
        let rows = await bAmazonModel.getDepartments();
        render(rows);
        let departmentIDarray = [];
        for (let i in rows) {
            departmentIDarray.push(`${rows[i].department_id}`);
        }
        return departmentIDarray;
    } catch (err) {
        console.error(`Error trying to insert ${err}`);
    }
}

// Manager : add new product
function addNewProduct(departments) {
    let promptInfo = [{
            name: 'product_name',
            message: 'Product Name?',
            validate: value => (value !== "")
        },
        {
            name: 'stock_quantity',
            message: 'How Many?',
            validate: value => (value !== "" && !isNaN(value))
        }, {
            name: 'price',
            message: 'Price?',
            validate: value => (value !== "" && !isNaN(value))
        }, {
            type: 'list',
            name: 'department_id',
            message: 'Department ID?',
            choices: departments
        },
        {
            name: 'more',
            message: 'Add More Products (y=yes)?'
        }
    ];

    inquirer.prompt(promptInfo).then(answer => {
        let department_id = parseInt(answer.department_id);
        let stock_quantity = Math.trunc(parseFloat(answer.stock_quantity));
        let price = parseFloat(answer.price);
        price = price.toFixed(2);

        let bAmazonModel = new BAmazonModel();
        bAmazonModel.addProduct(department_id, answer.product_name, price, stock_quantity).then(() => {
            console.log(`Added Product ${answer.product_name}`);
            if (answer.more != undefined && answer.more == 'y') {
                addNewProduct(departments);
            } else {
                managerMenu();
            }
        }).catch(err => {
            console.log(`Error adding product: ${err}`);
        });
    });
}

// Manager : adjust inventory
function updateInventory(productIDs) {
    let bAmazonModel = new BAmazonModel();

    let promptInfo = [{
        name: 'product_id',
        message: 'Product ID?',
        validate: value => (value !== "" && !isNaN(value) && productIDs.includes(parseFloat(value)))
    }, {
        name: 'newQuantity',
        message: 'New TOTAL Product Quantity?',
        validate: value => (value !== "" && !isNaN(value))
    }];

    inquirer.prompt(promptInfo).then(answer => {
        let newQuantity = Math.trunc(parseFloat(answer.newQuantity));

        bAmazonModel.updateProductQuantity(answer.product_id, newQuantity)
            .then(() => {
                console.log(`New Product Stock Quantity is ${newQuantity}`);
                managerMenu();
            })
            .catch(err => {
                console.log(`Error updating stock quantity ${err}.`);
            });
    });
}

// Manager : ADD to inventory
function addToInventory(productIDs) {
    let bAmazonModel = new BAmazonModel();

    let promptInfo = [{
        name: 'product_id',
        message: 'Product ID?',
        validate: value => (value !== "" && !isNaN(value) && productIDs.includes(parseFloat(value)))
    }, {
        name: 'addedQuantity',
        message: 'Stock Quantity to Add?',
        validate: value => (value !== "" && !isNaN(value))
    }];

    inquirer.prompt(promptInfo).then(answer => {
        let addedQuantity = Math.trunc(parseFloat(answer.addedQuantity));

        bAmazonModel.addToProductQuantity(answer.product_id, addedQuantity)
            .then(() => {
                console.log(`Add ${addedQuantity} to Product Stock`);
                managerMenu();
            })
            .catch(err => {
                console.log(`Error adding stock quantity ${err}.`);
            });
    });
}

// Manager menu
async function managerMenu() {
    let bAmazonModel = new BAmazonModel();
    let rows;
    let departments;
    let productIDs;

    const question = {
        type: 'list',
        name: 'managerMenu',
        message: '\n\nWhat do you want to do?',
        choices: ["View Products", "View Low Inventory", "Update Product Inventory", "Add to Product Inventory", "Add New Product", "QUIT"]
    };

    let answer = await inquirer.prompt(question);

    switch (answer.managerMenu) {
        case "View Products":
            rows = await bAmazonModel.getProductsByDepartment();
            render(rows);
            managerMenu();
            break;
        case "View Low Inventory":
            rows = await bAmazonModel.getProductsBelowQuantity(5);
            render(rows);
            managerMenu();
            break;
        case "Update Product Inventory":
            rows = await bAmazonModel.getProductsByDepartment();
            render(rows);
            productIDs = rows.map(r => r.product_id);
            updateInventory(productIDs);
            break;
        case "Add to Product Inventory":
            rows = await bAmazonModel.getProductsByDepartment();
            render(rows);
            productIDs = rows.map(r => r.product_id);
            addToInventory(productIDs);
            break;
        case "Add New Product":
            // get the departments to maintain ref integrity when adding product
            departments = await getDepartments();
            addNewProduct(departments);
            break;
        case "QUIT":
            break;
        default:
            break;
    }
}

module.exports = {
    managerMenu
};