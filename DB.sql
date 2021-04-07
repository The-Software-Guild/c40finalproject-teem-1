DROP DATABASE IF EXISTS userdb;

CREATE DATABASE userdb;

USE userdb;

CREATE TABLE User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE Ingredient (
	id INT PRIMARY KEY AUTO_INCREMENT,
    strName VARCHAR(40) NOT NULL,
    measure VARCHAR(20) DEFAULT NULL
);

CREATE TABLE User_Ingredient (
	
	id_ingredient INT NOT NULL,
    id_User INT NOT NULL,
    PRIMARY KEY (id_ingredient, id_User),
    FOREIGN KEY FK_Ingredient (id_ingredient) REFERENCES Ingredient (id),
    FOREIGN KEY FK_User (id_User) REFERENCES User (id)
);



INSERT INTO user(username, password) VALUES("alex","$2b$09$mH2ysAw.MkIWxiASsWwLK.IKtVCiYZw5WyPVYdnJnRA3NpXwcGyvC");
INSERT INTO user(username, password) VALUES("joe","$2b$09$ZyaSIfetz/wCLL/Ar/IDdOVMyQbWYp9R6OyTm3O2.QjsOJ.o6sAUG");


-- Get all ingredients for one user 
SELECT * FROM User u 
INNER JOIN User_Ingredient ui ON u.id = ui.id_user 
INNER JOIN Ingredient i ON i.id = ui.id_ingredient
WHERE u.id = 1;