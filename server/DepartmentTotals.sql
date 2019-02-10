USE bamazon_db;

SELECT p.department_id as 'Department ID', department_name as 'Department Name',
SUM(product_sales) as 'Total Sales', overhead_costs as 'Overhead Costs',
(SUM(product_sales) - overhead_costs) as 'Total Profit'
FROM products as p, departments as d
WHERE p.department_id = d.department_id 
GROUP BY p.department_id;