use bamazon_db;

select department_name, product_name, price, stock_quantity, product_sales
 from products, departments
 where products.department_id = departments.department_id
 order by department_name;
