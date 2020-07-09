CREATE DATABASE calendar;

USE calendar;

--tables

CREATE TABLE users(
    id INT(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users  
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;