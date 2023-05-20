
DROP DATABASE IF EXISTS crypto_price;
CREATE DATABASE IF NOT EXISTS crypto_price;
USE crypto_price;
DROP TABLE IF EXISTS crypto_price_table;
CREATE TABLE  IF NOT EXISTS crypto_price_table(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
pair VARCHAR(255),
base VARCHAR(255),
quote VARCHAR(255),
buy FLOAT,
sell FLOAT,
buy_usdt FLOAT,
sell_usdt FLOAT
);