CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    color VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);