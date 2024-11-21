USE sql_store;

BEGIN;

-- Insert customer
INSERT INTO customers (first_name, last_name, birth_date, phone, address, city, state, points)
VALUES ('Jane', 'Doe', '1999-11-11', '000-000-0000', 'address', 'Vancouver', 'BC', 100);

-- Insert order using a subquery to get the customer_id
INSERT INTO orders (customer_id, order_date, status, comments, shipped_date, shipper_id)
VALUES ((SELECT c.id FROM customers as c WHERE first_name = 'Jane' AND last_name = 'Doe'), CURRENT_TIMESTAMP, 1, '', NULL, 1);

-- Commit the transaction
COMMIT;
ROLLBACK;
