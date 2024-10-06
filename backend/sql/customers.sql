CREATE TABLE
    customers (
        customer_id BIGSERIAL PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(10) UNIQUE NOT NULL,
        city VARCHAR(30) NOT NULL,
        joined_on DATE DEFAULT CURRENT_DATE
    );

CREATE TABLE
    sight (
        sight_id BIGSERIAL PRIMARY KEY,
        spherical DECIMAL,
        cylinder DECIMAL,
        axis DECIMAL,
        addition DECIMAL
    );

CREATE TABLE
    customer_sight (
        customer_id BIGINT REFERENCES customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
        left_eye_id BIGINT REFERENCES sight (sight_id) ON DELETE CASCADE ON UPDATE CASCADE,
        right_eye_id BIGINT REFERENCES sight (sight_id) ON DELETE CASCADE ON UPDATE CASCADE
    );