USE bamazon_db;

INSERT INTO departments (department_name, overhead_costs) VALUES
("Books", 45000.00),
("Home", 5000.00),
("Shows", 5100.00),
("Fitness", 50000.00);

INSERT INTO products (department_id, product_name, price, stock_quantity) VALUES
(1, "Baby Einstein", 2.99, 10),
(1, "Of Mice and Men", 3.99, 25),
(1, "10 Habits of highly effective people", 3.99, 25),
(2, "Spatula", 8.49, 500),
(3, "The Good Doctor", 4.99, 50000),
(3, "Lucifer", 4.99, 50000),
(4, "Row Machine", 179.99, 10),
(4, "Bluetooth Jump Rope", 59.99, 120),
(4, "Dumbells", 19.99, 150),
(4, "Treadmill", 479.99, 5);

