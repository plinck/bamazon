"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");
const render = require("./render.js")

// Customer : Buy the product
function buyProduct(product_id, quantity, completedWorkCallback) {
    let bAmazonModel = new BAmazonModel();
    let totalSale;
    let newQuantity;

    bAmazonModel.getProductByID(product_id).then(rows => {
        if (rows[0].stock_quantity != undefined && rows[0].stock_quantity >= quantity) {
            totalSale = quantity * rows[0].price;
            newQuantity = rows[0].stock_quantity - quantity;

            bAmazonModel.updateProductSale(product_id, newQuantity, totalSale)
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

// Customer menu
async function customerMenu() {
    let bAmazonModel = new BAmazonModel();

    // use await since you cant ask them the question without showing them choices
    let rows = await bAmazonModel.getProductsByDepartment();
    render(rows);
    const productIDs = rows.map(r => r.product_id);

    const question = [{
            name: 'product_id',
            message: '\nWhat product you like to buy?',
            validate: value => (value !== "" && !isNaN(value) && productIDs.includes(parseFloat(value)))
        },
        {
            name: 'quantity',
            message: '\nHow Many would you like to buy?',
            validate: value => (value !== "" && !isNaN(value) )
        },
        {
            name: 'more',
            message: 'Add More (y=yes)?'
        }
    ];

    let answer = await inquirer.prompt(question);
    let product_id = parseInt(answer.product_id);
    let quantity = Math.trunc(parseFloat(answer.quantity));

    // use completion handler to come back when done and see if needing to go again
    // If the user wants to do it again, allow it
    buyProduct(product_id, quantity, () => {
        if (answer.more != undefined && answer.more == 'y') customerMenu();
    });
}

module.exports = {customerMenu};