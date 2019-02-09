"use strict";

const inquirer = require('inquirer');
const async = require('async');
const customer = require("./customer.js");
const manager = require("./manager.js");

// Main menu
async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: '\n\nWhat view do you want?',
        choices: ["customer", "manager", "supervisor", "QUIT"]
    };

    let answer = await inquirer.prompt(question);

    switch (answer.mainMenu) {
        case "customer":
            console.log(answer.mainMenu);
            customer.customerMenu();
            break;
        case "manager":
            console.log(answer.mainMenu);
            manager.managerMenu();
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