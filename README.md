# bamazon Node.js & MySQL

## Overview

This is an Amazon-like storefront Command Line Interface app (CLI). The app takes in orders from customers and depletes stock from the store's inventory. It tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.

## Instructions

- You must clone the repo to your machine since it is a console application
- Then npm install dependencies
- Create the database using the SQL files --- `server/bamazon_db.sql` and seed data with `server/bamazon_data.sql`
- Then run `node index` from the `server` directory - all sub menus are called from that for customer, manager and supervisor
- Create a mySQL database connecton with user id `plinck` and password `password` that has access to DB
- If you want to use JAWS DB you will need a .env with my Heroku DB URL in it.  I will give it to you if you need it.

## Technologies Used

- [x] Javascript
- [x] SQL (JawsDB on heroku and Local mySQL DB)
- [x] Node.js, inquirer, async, dotenv, mysql

## Screenshots
![Logo](server/images/bamazon275x200.png)

## Design
![ERD/EER](server/images/ERD.png)

### Notes

- I used promises in a several ways to demonstrate the differences -- async/await, try/catch and standard (.then, .catch). In addition I used standard callbacks.  I wanted to show all the different ways these things could be done.

### Main Menu

Main menu just displays customer, manager or supervisor to choose your roles.  Alternatively, you can run `customer.js`, `manager.js` or `supervisor.js` directly using node on command prompt.

### Customer View (Pick `customer` from main menu or run `node customer` from command prompt)

1. Create a MySQL Database called `bamazon`.

2. `products` table

  ```sql
   CREATE TABLE products (
    product_id     INT AUTO_INCREMENT NOT NULL,
    department_id  INT NOT NULL,
    product_name   VARCHAR(100) NOT NULL,
    price          DECIMAL(8, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales  DECIMAL(8, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id)
  );
  ```

3. `departments` table

  ```sql
  CREATE TABLE departments (
    department_id   INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    overhead_costs  DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (department_id)
  );
  ```

4. First, the app displays all of the items available for sale complete price, stock, id and name

5. It then prompts the user with two messages.
   - The first asks for the ID of the product they would like to buy.
   - The second message asks how many units of the product they would like to buy.

6. Once they have placed the order, it checks if the store has enough of the product to meet the request.
   - If not, the app logs a message indicated not enough stock, and then prevent the order from going through.

7. However, if the store _does_ have enough of the product, the app fulfills the order.
   - It updares database to reflect the remaining quantity (stock qty - purchased qty)
   - After that completes successfully the app shows the customer the total cost of their purchase and how many are left in stock.

- - -

### Manager View (Pick `manager` from main menu or run `node manager` from command prompt)

* The logic is in `manager.js` but it is called from mainMenu is index.js (or you can run directly wihtout going through the menu). Running as manager allows:

* `View Products for Sale` lists every available item: the item IDs, names, prices, department and quantities.

* `View Low Inventory` lists all items with an inventory count lower than **5**.

* `Update Inventory` displays products and then a prompt that lets the manager update the quanity of any item currently in the store.  You can make it higher or lower in case it was spoiled or something and to make testing easier.   So it does not force you to just add to the inventory, you can make it whatever you want.

* `Add New Product` allows the manager to add a new product to the store.

- - -

### Supervisor View (Pick `supervisor` from main menu or run `node supervisor` from command prompt)

1. `departments` table.
  ```sql
  CREATE TABLE departments (
    department_id   INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    overhead_costs  DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (department_id)
  );
  ```

2. When a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

3. The logic is in `supervisor.js` but is called from the mainMenu in index.js (or you can run directly without going through the mainMenu):

4. `View Product Sales by Department` displays a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` is not be stored in any database. Use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

## To Do

- Create icon and add to portfolio
- Move database connection to model ctor and destory and proper time
- add some input validation
- let them go through additional menus multiple times (like viewing inventory)
