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

