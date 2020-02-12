DROP DATABASE IF EXISTS basketball_db;
CREATE DATABASE basketball_db;
USE basketball_db;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    api_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);