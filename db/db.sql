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

--table information
CREATE TABLE information_personal(
    id INT(11) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    imageURL VARCHAR(100) NOT NULL,
    user_id INT (11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
); 

ALTER TABLE information_personal
    ADD PRIMARY KEY (id);

ALTER TABLE information_personal
     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE information_personal;