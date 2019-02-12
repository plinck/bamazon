"use strict";

const inquirer = require('inquirer');
const BAmazonModel = require("./BAmazonModel.js");
const render = require("./render.js");

// Get total sales and profit for each department
function departmentSales() {
    let bAmazonModel = new BAmazonModel();
    render.clearScreen();
    
    bAmazonModel.getDepartmentTotals()
    .then((rows) => {
        render.render(rows);
        supervisorMenu();
    })
    .catch(err => {
        console.log(`Error finding department Totals: ${err}`);
    });


}

function exitProgram() {
    console.log("BYE!");
}

// Main menu
function supervisorMenu() {
    const menuItems = {
        "View Product Sales by Department": departmentSales,
        "QUIT": exitProgram
    };

    const question = {
        type: 'list',
        name: 'mainMenu',
        message: '\n\nWhat do you want to do?',
        choices: Object.keys(menuItems)
    };

    inquirer.prompt(question).then(answer => {
        menuItems[answer.mainMenu]();
    });

}

//
module.exports = {supervisorMenu};