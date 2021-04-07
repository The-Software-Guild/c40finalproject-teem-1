DROP DATABASE IF EXISTS userdb;

CREATE DATABASE userdb;

USE userdb;

CREATE TABLE User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE Cocktail(
	idCocktail INT PRIMARY KEY AUTO_INCREMENT,
    dateCreated DATE NOT NULL,
    strAlcoholic VARCHAR(20) NOT NULL,
    strCategory VARCHAR(40) NOT NULL,
    name VARCHAR(40) NOT NULL,
    strInstructions TEXT NOT NULL,
	idUser INT NOT NULL,
    FOREIGN KEY FKUser (idUser) REFERENCES User(id)
);



CREATE TABLE Measure (
	idMeasure INT PRIMARY KEY AUTO_INCREMENT,
    unit VARCHAR(40) NOT NULL
);

CREATE TABLE Ingredient (
	idIngredient INT PRIMARY KEY AUTO_INCREMENT,
    strName VARCHAR(40) NOT NULL,
    idMeasure INT NULL,
    FOREIGN KEY FKMeasure (idMeasure) REFERENCES Measure (idMeasure)
);

CREATE TABLE CocktailIngredient
(
	-- PRIMARY KEY (idIngredient, idCocktail),
	idCocktailIngredient INT PRIMARY KEY AUTO_INCREMENT,
	idIngredient INT,
    idCocktail INT,
    FOREIGN KEY FKCocktail (idCocktail) REFERENCES Cocktail (idCocktail),
    FOREIGN KEY FKIngredient (idIngredient) REFERENCES Ingredient (idIngredient)
);

INSERT INTO Measure (unit)
VALUES 
("cup"),
("cups"),
("oz"),
("none"),
("ml"),
("tablespoon"),
("teaspoon"),
("teaspoons");

INSERT INTO Ingredient (strName) 
VALUES 
("Ice"),
("Cherry"),
("Orange slice"),
("Rum"),
("Pisco"),
("Amaretto"),
("Whiskey"),
("Tequila"),
("Vodka"),
("Grand Marnier"),
("Coffee liqueur"),
("Malibu rum"),
("Gin"),
("Rum"),
("Cognac"),
("Soda"),
("Coke"),
("Scotch"),
("Orange juice"),
("Pineapple juice"),
("Lemonade"),
("Cranberry juice"),
("Citrus wedge"),
("Lemon"),
("Lime"),
("Orange"),
("Grapefruit"),
("Beer"),
("Cider"),
("Wine"),
("Rice wine");

-- One cocktail with ingredients 
SELECT * FROM  Cocktail c 
INNER JOIN CocktailIngredient ci ON c.idCocktail = ci.idCocktail 
INNER JOIN Ingredient i ON i.idIngredient = ci.idIngredient
WHERE c.idCocktail = 1;

-- List of cocktails with their ingredients 
SELECT * FROM  Cocktail c 
INNER JOIN CocktailIngredient ci ON c.idCocktail = ci.idCocktail 
INNER JOIN Ingredient i ON i.idIngredient = ci.idIngredient;

INSERT INTO user(username, password) VALUES("alex","$2b$09$mH2ysAw.MkIWxiASsWwLK.IKtVCiYZw5WyPVYdnJnRA3NpXwcGyvC");
INSERT INTO user(username, password) VALUES("joe","$2b$09$ZyaSIfetz/wCLL/Ar/IDdOVMyQbWYp9R6OyTm3O2.QjsOJ.o6sAUG");