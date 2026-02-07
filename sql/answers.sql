
Q1: Posts per creator

SELECT
  c.name AS creator_name,
  COUNT(p.id) AS total_posts
FROM creators c
LEFT JOIN posts p
  ON p.creator_id = c.id
GROUP BY c.id, c.name
ORDER BY total_posts DESC;


Q2: Current active revenue per creator

SELECT
  c.name AS creator_name,
  COALESCE(SUM(s.plan_price), 0) AS current_revenue
FROM creators c
LEFT JOIN subscriptions s
  ON s.creator_id = c.id
  AND s.status = 'active'
  AND s.end_date IS NULL
GROUP BY c.id, c.name
ORDER BY current_revenue DESC;

Q3: January 2025 cohort conversion

SELECT
  c.signup_date,
  COUNT(DISTINCT c.id) AS creators_signed,
  COUNT(DISTINCT s.creator_id) AS creators_with_active_subscription,
  COUNT(DISTINCT s.creator_id)::DECIMAL
    / COUNT(DISTINCT c.id) AS conversion_rate
FROM creators c
LEFT JOIN subscriptions s
  ON s.creator_id = c.id
  AND s.status = 'active'
  AND s.end_date IS NULL
WHERE c.signup_date >= DATE '2025-01-01'
  AND c.signup_date < DATE '2025-02-01'
GROUP BY c.signup_date
ORDER BY c.signup_date;

Q4: Revenue efficiency metric

WITH revenue_per_creator AS (
  SELECT
    c.id,
    c.name,
    SUM(s.plan_price) AS revenue
  FROM creators c
  JOIN subscriptions s
    ON s.creator_id = c.id
    AND s.status = 'active'
    AND s.end_date IS NULL
  GROUP BY c.id, c.name
),
views_per_creator AS (
  SELECT
    creator_id,
    SUM(views) AS views
  FROM posts
  GROUP BY creator_id
)
SELECT
  r.name AS creator_name,
  r.revenue,
  v.views,
  r.revenue / (v.views / 1000.0) AS revenue_per_1000_views
FROM revenue_per_creator r
JOIN views_per_creator v
  ON v.creator_id = r.id
WHERE v.views > 0
ORDER BY revenue_per_1000_views DESC
LIMIT 3;

