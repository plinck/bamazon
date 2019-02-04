DROP DATABASE IF EXISTS auctionDB;

CREATE DATABASE auctionDB;

USE auctionDB;

CREATE TABLE auctionItems (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(255) NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

### Alternative way to insert more than one row
INSERT INTO auctionItems (name, description, price, quantity)
VALUES ("bike", "Specialized Tarmac Disc", 5000.00, 1), ("shoes", "Hoka One One Shoes", 100.00, 1);

