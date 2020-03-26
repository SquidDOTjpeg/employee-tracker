DROP DATABASE IF EXISTS companyDB;

CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE department (
   id INT,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT,
   title  VARCHAR(30) NOT NULL,
   salary  DECIMAL,
   department_id  INT NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE employee (
   id INT 
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT NULL,
   PRIMARY KEY(id)
);

