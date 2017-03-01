# Introduction

Sales Bot is a tool that allows salespeople to interact with a message bot that acts like a sales assistant. Relevant information relating to the users Clients, Sales, Costs, and Performance Goals gathered and sent to the Sales Bot API. The API will receive the gathered information, store it, and can be called in order to recieve the relevant `JSON` from the request

## Getting Started
### Install
```sh
npm install
```

## Built Using
List of Technologies:
* Node.js
* Express
* MySQL
* knex.js

## End Points
### Post
#### Customers
##### End point used to store new Customers in DB
 `https://decode-bot-project-sql-ajdez.c9users.io/company`

#### Sales
##### End point used to store new Sale instance
 `https://decode-bot-project-sql-ajdez.c9users.io/sales`

#### Costs
##### End point used to store new Costs instance
 `https://decode-bot-project-sql-ajdez.c9users.io/expenses`

#### Goals
##### End point used to set a new performance goal
 `https://decode-bot-project-sql-ajdez.c9users.io/goals`

### Get
#### Customer
##### End Point
###### Retrieves all customers from database
* `https://decode-bot-project-sql-ajdez.c9users.io/company`
* ouput example:

```json
{
  "id": 1,
  "name": "DecodeMTL",
  "createdAt": "2017-02-15T20:38:27.000Z"
}
```

##### Query String Parameters Option(s)
###### Retrieves ID for specific customer
 * String: `?name`
 * ouput example:
```json
{
   "id": 1
}
```


#### Sales
##### End Point
###### Retrieves all sales from database
* `https://decode-bot-project-sql-ajdez.c9users.io/sales`
* ouput example: 
``` json
{
  "id": 1,
  "customer_id": 1,
  "amount": 500,
  "createdAt": "2017-02-26T20:38:27.000Z"
}
```

##### Query String Parameters Option(s)
###### Retrieves all sales data from specific customer
* String: `?name`
* ouput example: 
```json
{
  "id": 1,
  "name": "DecodeMTL",
  "amount": 500,
  "createdAt": "2017-02-26T20:38:27.000Z"
}
```

###### Retrieves all sales data from specific Year
* String: `?year`
* output example: 
```json
{
  "id": 1,
  "customer_id": 1,
  "amount": 500,
  "createdAt": "2017-02-26T20:38:27.000Z"
},
{
  "id": 2,
  "customer_id": 1,
  "amount": 750,
  "createdAt": "2017-02-27T22:18:27.000Z"
}
```

#### Costs
##### End Point
###### Retrieves all costs from database
* `https://decode-bot-project-sql-ajdez.c9users.io/expenses`
* example output: 
```json
{
  "id": 1,
  "customer_id": 1,
  "amount": 500,
  "createdAt": "2017-02-26T20:38:27.000Z"
}
```

##### Query String Parameters Option(s)
###### Retrieves all costs from specific customer id
* String: `?companyId`
* example output: 
```json
{
  "id": 2,
  "customer_id": 2,
  "amount": 1300,
  "createdAt": "2017-02-18T21:34:27.000Z",
  "name": "Google"
}
```

###### Retrieves all costs from specific year
* String: `?year`
* example output: 
```json
{
  "id": 1,
  "customer_id": 1,
  "amount": 350,
  "createdAt": "2017-02-26T12:33:27.000Z"
},
{
  "id": 2,
  "customer_id": 1,
  "amount": 520,
  "createdAt": "2017-03-05T22:38:27.000Z"
}
```


#### Reports
##### End Point
`https://decode-bot-project-sql-ajdez.c9users.io/reports`

##### Query String Parameters Option(s)
###### Retrieves users total revenue
* String: `?totalRev`
* ouput Example: 
```json
{
  "Total_Sales": 29790
}
```

###### Retrieves users total expenses
* String: `?totalExpenses`
* output example: 
```json
{
  "Total_Expenses": 16320
}
```

###### Retrieves average deal size of users sales
* String: `?avgDealSize`
* output example: 
```json
{
  "Amount_Of_Sales": 25,
  "Total_Sales": 29790,
  "Avg_Sale_Amount": 1191.6
}
```

###### Retrieves list of customers and amount of revenue generated from them
* String: `?topClients`
* output example: 
```json
{
  "CompanyName": "DecodeMTL",
  "TotalSales": 6750
},
{
  "CompanyName": "Google",
  "TotalSales": 7670
},
{
  "CompanyName": "Pixar",
  "TotalSales": 8360
}
```

###### Retrieves user total profits
* String: `?profits`
* output example: 
```json
{
  "Profit": 13470
}
```

###### Retrieves users Gross Profit Margin
* String: `?grossProfitMargin`
* output example: 
```json
{
  "Gross_Profit_Margin_Percent": 45.22
}
```

###### Retrieves users Sales, Costs, Profits for each Month
* String: `?barChartQuery`
* output example: 
```json
{
  "Month": "January",
  "Sales": 400,
  "Costs": 200,
  "Profits": 200
},
{
  "Month": "February",
  "Sales": 13000,
  "Costs": 5970,
  "Profits": 7030
},
{
  "Month": "March",
  "Sales": 5700,
  "Costs": 4290,
  "Profits": 1410
}
```

###### Retrieves Company name, amount sold, and date of transaction
* String: `?tableChart`
* output example:
```json
{
  "Customers": "DecodeMTL",
  "Sales": 2600,
  "Dates": "2017-04-27T22:32:27.000Z"
},
{
  "Customers": "Google",
  "Sales": 650,
  "Dates": "2017-04-26T20:38:27.000Z"
},
{
  "Customers": "Pixar",
  "Sales": 1650,
  "Dates": "2017-04-26T20:38:27.000Z"
}
```

###### Retrieves Goal Amount (what the goal was set at), Current Amount (progress), Amount missing until goal is reached, Goal Start and End date
* String: `?goalGauge`
* output string: 
```json
{
  "id: 1,
  "GoalAmount": 20000,
  "CurrentAmount": 25690,
  "AmountMissing": -5690,
  "StartDate": "2017-02-20T00:00:00.000Z",
  "EndDate": "2017-05-20T00:00:00.000Z"
},
{
  "id"": 2,
  "GoalAmount": 11000,
  "CurrentAmount": 12600,
  "AmountMissing": -1600,
  "StartDate": "2017-02-01T00:00:00.000Z",
  "EndDate": "2017-02-28T00:00:00.000Z"
},
{
  "id": 4,
  "GoalAmount": 500,
  "CurrentAmount": 400,
  "AmountMissing": 100,
  "StartDate": "2017-01-01T00:00:00.000Z",
  "EndDate": "2017-01-31T00:00:00.000Z"
}
```

###### Retrieves number of times user achieved a set out goal
* String: `?goalsAchieved`
* output example:
```json
{
  "goalsCompleted": 3
}
```



## Authors
* [Anthony Desormeau](https://github.com/ajdez)
* [Randy Klose](https://github.com/Randyklose)
* [Joseph Melanson](https://github.com/joemelanson)
