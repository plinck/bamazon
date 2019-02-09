"use strict";

const inquirer = require('inquirer');
const async = require('async');
const customer = require("./customer.js");
const manager = require("./manager.js");

function exitProgram() {
    console.log("BYE!");
}

// Main menu
async function mainMenu() {
    const menuItems = {
        "customer": customer.customerMenu,
        "manager": manager.managerMenu,
        "supervisor": exitProgram,
        "QUIT": exitProgram
    };

    const question = {
        type: 'list',
        name: 'mainMenu',
        message: '\n\nWhat view do you want?',
        choices: Object.keys(menuItems)
    };

    inquirer.prompt(question).then(answer => {
        menuItems[answer.mainMenu]();
    });

}

//
mainMenu();