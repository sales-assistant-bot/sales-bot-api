CREATE TABLE customers(
 id         INT(11)         AUTO_INCREMENT      PRIMARY KEY,
 name       VARCHAR(50)     NOT NULL        UNIQUE,
 createdAt  DATETIME
);

CREATE TABLE sales(
 id             INT(11)         AUTO_INCREMENT      PRIMARY KEY,
 customer_id    INT(11)         NOT NULL            REFERENCES customers(id),
 amount         DECIMAL(10, 2)  NOT NULL,
 createdAt      DATETIME
);

CREATE TABLE costs(
 id             INT(11)         AUTO_INCREMENT      PRIMARY KEY,
 customer_id    INT(11)         NOT NULL            REFERENCES customers(id),
 amount         DECIMAL(10, 2)  NOT NULL,
 createdAt      DATETIME
);


--goal Table

CREATE TABLE goals (
 id             INT(11)     AUTO_INCREMENT      PRIMARY KEY,
 amount         DECIMAL(10, 2)   NOT NULL,
 startDate      DATETIME,
 endDate        DATETIME,
 createdAt      DATETIME,
 updatedAt      DATETIME
);

--Leads (use if we have time)

-- CREATE TABLE leads (
--  id             INT(11)         AUTO_INCREMENT      PRIMARY KEY,
--  name           VARCHAR(50),
--  createdAt      DATETIME,
--  updatedAt      DATETIME,
--  convertedAt    DATETIME,
--  customer_id    INT(11)         REFERENCES customers(id)
-- );





-- GOals
select goals.id, goals.amount as GoalAmount, 
       sum(sales.amount) as CurrentAmount, 
       (goals.amount - sum(sales.amount)) as AmountMissing, 
        goals.startDate as StartDate,
        goals.endDate as EndDate
from sales
join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
group by goals.id;



-- Goals Amount
select count(goals.ID)
 from (
        select goals.id as ID, (goals.amount - sum(sales.amount)) as amountTo
        from sales
        join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
        group by goals.id
        having amountTo <= 0 
  ) as goals;



-- BAR CHART QUERY COMPLETE
select all_months.name as Month,
       coalesce(sales.total_sales, 0) as Sales,
       coalesce(costs.total_costs, 0) as Costs,
       (coalesce(sales.total_sales, 0) - coalesce(costs.total_costs, 0)) as Profits
 from all_months
  left join (
    select sum(sales.amount) as total_sales, MONTH(sales.createdAt) as month from sales group by MONTH(sales.createdAt)
  ) as sales on sales.month = all_months.id
  left join (
    select sum(costs.amount) as total_costs, MONTH(costs.createdAt) as month from costs group by MONTH(costs.createdAt)
  ) as costs on costs.month = all_months.id
 order by all_months.id;