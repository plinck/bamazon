"use strict";

const inquirer = require('inquirer');
const customer = require("./customer.js");
const manager = require("./manager.js");
const supervisor = require("./supervisor.js");

function exitProgram() {
    console.log("BYE!");
}

// Main menu
function mainMenu() {
    const menuItems = {
        "customer": customer.customerMenu,
        "manager": manager.managerMenu,
        "supervisor": supervisor.supervisorMenu,
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