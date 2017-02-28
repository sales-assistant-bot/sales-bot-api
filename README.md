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
 * ouput example: `{
id: 1
}`


#### Sales
##### End Point
###### Retrieves all sales from database
* `https://decode-bot-project-sql-ajdez.c9users.io/sales`
* ouput example: `{
id: 1,
customer_id: 1,
amount: 500,
createdAt: "2017-02-26T20:38:27.000Z"
}`

##### Query String Parameters Option(s)
###### Retrieves all sales data from specific customer
* String: `?name`
* ouput example: `{
id: 1,
name: "DecodeMTL",
amount: 500,
createdAt: "2017-02-26T20:38:27.000Z"
}`

###### Retrieves all sales data from specific Year
* String: `?year`
* output example: `{
id: 1,
customer_id: 1,
amount: 500,
createdAt: "2017-02-26T20:38:27.000Z"
},
{
id: 2,
customer_id: 1,
amount: 750,
createdAt: "2017-02-27T22:18:27.000Z"
}`

#### Costs
##### End Point
###### Retrieves all costs from database
* `https://decode-bot-project-sql-ajdez.c9users.io/expenses`
* example output: `{
id: 1,
customer_id: 1,
amount: 500,
createdAt: "2017-02-26T20:38:27.000Z"
}`

##### Query String Parameters Option(s)
###### Retrieves all costs from specific customer id
* String: `?companyId`
* example output: `{
id: 2,
customer_id: 2,
amount: 1300,
createdAt: "2017-02-18T21:34:27.000Z",
name: "Google"
}`

###### Retrieves all costs from specific year
* String: `?year`
* example output: `{
id: 1,
customer_id: 1,
amount: 350,
createdAt: "2017-02-26T12:33:27.000Z"
},
{
id: 2,
customer_id: 1,
amount: 520,
createdAt: "2017-03-05T22:38:27.000Z"
}`


#### Reports





## Authors
* [Anthony Desormeau](https://github.com/ajdez)
* [Randy Klose](https://github.com/Randyklose)
* [Joseph Melanson](https://github.com/joemelanson)
