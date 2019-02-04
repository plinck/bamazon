"use strict";

const inquirer = require('inquirer');
const async = require('async');

async function postItem() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: 'Would you like to post or bid?',
        choices: ["BID", "POST", "QUIT"]
    };
    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);

        switch (answer.mainMenu) {
            case "BID":
                console.log(answer.mainMenu);
                break;
            case "POST":
                console.log(answer.mainMenu);
                break;
            case "QUIT":
                console.log(answer.mainMenu);
                done = true;
                break;
            default:
                console.log(answer.mainMenu);
                break;
        }
    }
}

//
async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: 'Would you like to post or bid?',
        choices: ["BID", "POST", "QUIT"]
    };
    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);

        switch (answer.mainMenu) {
            case "BID":
                console.log(answer.mainMenu);
                break;
            case "POST":
                console.log(answer.mainMenu);
                break;
            case "QUIT":
                console.log(answer.mainMenu);
                done = true;
                break;
            default:
                console.log(answer.mainMenu);
                break;
        }
    }
}

mainMenu();