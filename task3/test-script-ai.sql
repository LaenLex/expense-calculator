SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

WITH max_month AS (
    SELECT MAX(order_date) AS max_date
    FROM orders
),
date_range AS (
    SELECT 
        date(strftime('%Y-%m-01', max_date), '-2 months') AS start_date,
        date(strftime('%Y-%m-01', max_date), '+1 month')  AS end_date
    FROM max_month
)
SELECT AVG(amount) AS avg_order_value_last_3_months
FROM orders
CROSS JOIN date_range
WHERE amount IS NOT NULL
  AND order_date >= start_date
  AND order_date < end_date;
