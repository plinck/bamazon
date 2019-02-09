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
function updateInventory() {
    let bAmazonModel = new BAmazonModel();

    let promptInfo = [{
        name: 'product_id',
        message: 'Product ID?'
    }, {
        name: 'newQuantity',
        message: 'New TOTAL Product Quantity?'
    }];

    inquirer.prompt(promptInfo).then(answer => {
        bAmazonModel.updateProductQuantity(answer.product_id, answer.newQuantity)
            .then(() => {
                console.log(`New Product Stock Quantity is ${answer.newQuantity}`);
            })
            .catch(err => {
                console.log(`Error updating stock quantity ${err}.`);
            });
    });
}

// Manager menu
async function managerMenu() {
    let bAmazonModel = new BAmazonModel();
    let rows;
    let departments;

    const question = {
        type: 'list',
        name: 'managerMenu',
        message: '\n\nWhat do you want to do?',
        choices: ["View Products", "View Low Inventory", "Update Product Inventory", "Add New Product"]
    };

    let answer = await inquirer.prompt(question);

    switch (answer.managerMenu) {
        case "View Products":
            rows = await bAmazonModel.getProductsByDepartment();
            render(rows);
            break;
        case "View Low Inventory":
            rows = await bAmazonModel.getProductsBelowQuantity(50);
            render(rows);
            break;
        case "Update Product Inventory":
            rows = await bAmazonModel.getProductsByDepartment();
            render(rows);
            updateInventory();
            break;
        case "Add New Product":
            // get the departments to maintain ref integrity when adding product
            departments = await getDepartments();
            addNewProduct(departments);
            break;
        default:
            break;
    }
}

module.exports = {
    managerMenu
};