"use strict";

const inquirer = require('inquirer');
const async = require('async');
const BAmazonModel = require("./BAmazonModel.js");

// Main menu
async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to view?',
        choices: ["departments", "products", "QUIT"]
    };

    let bAmazonModel = new BAmazonModel();

    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);

        switch (answer.mainMenu) {
            case "products":
                console.log(answer.mainMenu);
                bAmazonModel.getProductsByDepartment();
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

mainMenu();