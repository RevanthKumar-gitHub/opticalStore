CREATE TABLE
    frames (
        frame_code VARCHAR(30) PRIMARY KEY,
        frame_company VARCHAR(20) NOT NULL,
        quantity INT NOT NULL,
        frame_type VARCHAR(30) NOT NULL,
        frame_model VARCHAR(30) NOT NULL,
        purchase_price INT NOT NULL,
        sale_price INT NOT NULL,
        added_at DATE DEFAULT CURRENT_DATE
    );