USE bamazon_db;

INSERT INTO departments (department_name, overhead_costs) VALUES
("Books", 45000.00),
("Home", 5000.00),
("Fitness", 50000.00);

INSERT INTO products (department_id, product_name, price, stock_quantity) VALUES
(1, "Baby Einstein", 2.99, 7),
(1, "Of Mice and Men", 3.99, 25),
(2, "Spatula", 8.49, 500),
(3, "Row Machine", 179.99, 8);

