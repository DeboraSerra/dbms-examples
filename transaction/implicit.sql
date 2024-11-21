--SQLite, MySQL, and PostgreSQL do not support it

SET IMPLICIT_TRANSACTIONS ON;

INSERT INTO
    customers (first_name, last_name)
VALUES ('Jane', 'Doe');

INSERT INTO
    orders (
        customer_id,
        order_date,
        status,
        comments,
        shipped_date,
        shipper_id
    )
SELECT id, CURRENT_TIMESTAMP, 1, '', NULL, 1
FROM customers
WHERE
    first_name = 'Jane'
    AND last_name = 'Doe';

SELECT @@TRANCOUNT AS OpenTransactions;

COMMIT;

ROLLBACK;

SELECT @@TRANCOUNT AS OpenTransactions;