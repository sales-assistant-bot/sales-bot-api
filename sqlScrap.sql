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

--Leads

CREATE TABLE leads (
 id             INT(11)         AUTO_INCREMENT      PRIMARY KEY,
 name           VARCHAR(50),
 createdAt      DATETIME,
 updatedAt      DATETIME,
 convertedAt    DATETIME,
 customer_id    INT(11)         REFERENCES customers(id)
);