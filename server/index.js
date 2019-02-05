"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");

function renderProducts(rows) {
    console.log(`\n----------------------------------------------------------------------\n`);

    for (let i in rows) {
        //console.log(row);
        let row = rows[i];
        console.log(row.product_id, row.product_name, row.department_name, row.price, row.stock_quantity, row.product_sales);
    }
    console.log(`\n----------------------------------------------------------------------\n`);

}

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

    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);
        let product_id = parseInt(answer.product_id);
        let quantity = parseInt(answer.quantity);

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

        done = true;
    }
}

// Main menu
async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: '\n\nWhat would you like to view?',
        choices: ["departments", "products", "QUIT"]
    };

    let bAmazonModel = new BAmazonModel();

    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);

        switch (answer.mainMenu) {
            case "products":
                console.log(answer.mainMenu);
                bAmazonModel.getProductsByDepartment().then(rows => {
                    renderProducts(rows);
                });
                break;
            case "departments":
                console.log(answer.mainMenu);
                bAmazonModel.getDepartments();
                break;
            case "QUIT":
                console.log(answer.mainMenu);
                done = true;
                break;
        }
    }
}

//

customerMenu();