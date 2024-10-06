CREATE TABLE
    lens (
        lens_code VARCHAR(10) PRIMARY KEY,
        spherical DECIMAL,
        cylinder DECIMAL,
        axis DECIMAL,
        addition DECIMAL,
        lens_model VARCHAR(20) NOT NULL,
        lens_type VARCHAR(20) NOT NULL,
        lens_category VARCHAR(20) NOT NULL,
        quantity INT NOT NULL,
        purchase_price INT NOT NULL,
        sales_price INT NOT NULL
    );