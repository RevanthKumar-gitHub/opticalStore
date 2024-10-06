CREATE DATABASE opticalstore;

CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        created_at DATE DEFAULT CURRENT_DATE
    );