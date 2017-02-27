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





 
select goals.id, goals.amount as GoalAmount, 
       sum(sales.amount) as CurrentAmount, 
       (goals.amount - sum(sales.amount)) as AmountMissing, 
        goals.startDate as StartDate,
        goals.endDate as EndDate
from sales
join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
group by goals.id;



select count(goals.id)
from sales
join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
where (select (goals.amount - sum(sales.amount)) as value
       from sales
       join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
       group by goals.id) <= 0
group by goals.id;




select count(goals.id), (goals.amount - sum(sales.amount)) as value
from sales
join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)
where 0 > (select (goals.amount - sum(sales.amount) from sales join goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt group by goals.id)))
group by goals.id;


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