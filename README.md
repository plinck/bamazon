# bamazon Node.js & MySQL

## Overview

This is an Amazon-like storefront Command Line Interface app (CLI). The app takes in orders from customers and depletes stock from the store's inventory. As a bonus, it tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.

## Technologies Used

- [x] Javascript
- [x] mySQL (JawsDB on heroku)
- [x] Node.js
- [x] Inquire

## Screenshots

## Design

### Part #1: Customer View

1. Create a MySQL Database called `bamazon`.

2. `products` table (with 10 product examples)

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

### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale

    * View Low Inventory

    * Add to Inventory

    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -

* If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.

- - -

### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department

   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)


## Submission Guide

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku. This time, though, you need to include screenshots, a gif, and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file.

- Include screenshots (or a video) of typical user flows through your application (for the customer and if relevant the manager/supervisor). This includes views of the prompts and the responses after their selection (for the different selection options).

- Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works. 

- Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.

- - -

## To Do

- Create icon and add to portfolio
