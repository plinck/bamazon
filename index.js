"use strict";

const inquirer = require('inquirer');
const async = require('async');
const Database = require("./DatabasePromise.js");

// Test harness
function getProducts() {
    let database = new Database();

    database.query("SELECT * FROM products")
        .then(rows => {
            console.log(rows);
            // do something with the result
        })
        .catch(err => {});
    database.close();
}

function getDepartments() {
    let database = new Database();

    database.query("SELECT * FROM departments")
        .then(rows => {
            console.log(rows);
        })
        .catch(err => {});

    database.close();
}

async function mainMenu() {
    const question = {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to view?',
        choices: ["departments", "products", "QUIT"]
    };

    let done = false;
    while (!done) {
        let answer = await inquirer.prompt(question);

        switch (answer.mainMenu) {
            case "products":
                console.log(answer.mainMenu);
                getProducts();
                break;
            case "departments":
                console.log(answer.mainMenu);
                getDepartments();
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