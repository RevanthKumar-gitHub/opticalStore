CREATE TABLE
    orders (
        order_id BIGSERIAL PRIMARY KEY,
        customer_id BIGINT REFERENCES customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
        discount DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        advance DECIMAL(10, 2) DEFAULT 0,
        due DECIMAL(10, 2) DEFAULT 0,
        order_status VARCHAR(20) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    order_details (
        product_id BIGSERIAL PRIMARY KEY,
        frame_id VARCHAR(30) REFERENCES frames (frame_code) ON DELETE CASCADE ON UPDATE CASCADE,
        frame_quantity INT DEFAULT 0,
        lens_id VARCHAR(30) REFERENCES lens (lens_code) ON DELETE CASCADE ON UPDATE CASCADE,
        lens_quantity INT DEFAULT 0,
        order_id BIGINT REFERENCES orders (order_id) ON DELETE CASCADE ON UPDATE CASCADE
    );