// var knex = require('knex')({
//    dialect: 'mysql',
//    connection: {
//       database: 'DECODE_BOT'
//    }
// });

module.exports = function DecodeBotAPI(knex) {
   return {
      //get all sale info for user
      allSaleInfo: function() {
         return (
            knex('sales').select('*')
         )
      },
      //All cost instances for user
      allCostInfo: function() {
         return (
            knex('costs').select("*")
         )
      },
      //all customer/clients for user
      allCustomerInfo: function() {
         return (
            knex('customers').select("*")
         )
      },
      //all goal created for user
      allGoalInfo: function() {
         return (
            knex('goals').select("*")
         )
      },
      customerInfoByName: function(companyName) {
         return (
            knex('customers').select('id').where("customers.name", '=', companyName)
         )
      },
      //list of sales instances for given customer
      customerSales: function(customerName) {
         return (
            knex('sales')
            .select(`id`, `name`)
            .innerJoin("customers", "sales.customer_id", '=', 'customers.id')
            .where('name', '=', customerName)
         )
      },
      //list of cost/expensees instance for given customer
      customerCost: function(customerId) {
         return (
            knex('costs')
            .select('*')
            .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
            .where('customers.id', customerId)
         )
      },
      salesForGivenYear: function(year) {
         return (
            knex('sales')
            .select("*")
            .whereRaw(`YEAR(sales.createdAt) = ${year}`)
         )
      },
      costForGivenYear: function(year) {
         return (
            knex('costs')
            .select('*')
            .whereRaw(`YEAR(costs.createdAt) = ${year}`)
         )
      },
      // Total Revenue (total dollar worth of sales)
      totalRev: function() {
         return (
            knex("sales").sum('sales.amount as Total_Sales')
            .then(function(data) {
               return data[0];
            })
         )
      },
      totalExpenses: function() {
         return (
            knex('costs')
            .sum('costs.amount as Total_Expenses')
            .then(function(data) {
               return data[0];
            })
         )
      },
      //Average Deal Size (total sales amount / total sales)
      avgDealSize: function() {
         return (
               knex('sales')
               .count('sales.id as Amount_Of_Sales')
               .sum('sales.amount as Total_Sales')
               .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount"))
            )
            .then(data => data[0])
      },
      profits: function() {
         return (
               knex.select(knex.raw(`((select SUM(sales.amount) from sales) - (select SUM(costs.amount) from costs)) as Profit`))
            )
            .then(data => data[0])
      },
      barChartQuery: function(){
         var sales = (
            knex('sales')
               .sum('sales.amount as total_sales')
               .select(knex.raw('MONTH(sales.createdAt) as month'))
               .groupByRaw('MONTH(sales.createdAt)')
         ).as('sales')
         
         var costs = (
            knex('costs')
               .sum('costs.amount as total_costs')
               .select(knex.raw('MONTH(costs.createdAt) as month'))
               .groupByRaw('MONTH(costs.createdAt)')
         ).as('costs')
         
         return(
            knex
               .select('all_months.name as Month')
               .select(knex.raw('coalesce(sales.total_sales, 0) as Sales'))
               .select(knex.raw('coalesce(costs.total_costs, 0) as Costs'))
               .select(knex.raw('(coalesce(sales.total_sales, 0)-coalesce(costs.total_costs,0)) as Profits'))
               .from('all_months')
               .leftJoin(sales, 'all_months.id', '=', 'sales.month')
               .leftJoin(costs, 'all_months.id', '=', 'costs.month')
               .orderBy('all_months.id')
         )
      },
      tableChart: function() {
         return (
            knex('sales')
            .select('customers.name as Customers', 'sales.amount as Sales', 'sales.createdAt as Dates')
            .innerJoin('customers', 'customers.id', '=', 'sales.customer_id')
            .orderByRaw('Dates DESC')
            .limit(5)
         )
      },
      //Gross Profit Margin ((Total Rev - Total Cost)/Total Revenue)    %%%%%%
      /*For ALL DATA */
      grossProfitMargin: function() {
         return (
               knex.select(knex.raw(`ROUND((((SELECT SUM(sales.amount)
                                          FROM sales) - (
                                             SELECT SUM(costs.amount)
                                             from costs))/(
                                                SELECT SUM(sales.amount)
                                                FROM sales))*100, 2) AS Gross_Profit_Margin_Percent`))
            )
            .then(function(data) {
               return data[0];
            })
      },
      topClients: function() {
         return (
            knex('customers')
            .select(`customers.name as CompanyName`)
            .sum('sales.amount as TotalSales')
            .innerJoin('sales', 'sales.customer_id', '=', 'customers.id')
            .groupBy('customers.id')
         )
      },
      goalGauge: function() {
         return(
            knex
            .select('goals.id', 'goals.amount as GoalAmount')
            .sum('sales.amount as CurrentAmount')
            .select(knex.raw('(goals.amount - sum(sales.amount)) as AmountMissing'))
            .select('goals.startDate as StartDate', 'goals.endDate as EndDate')
            .from('sales')
            .innerJoin(knex.raw(`goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)`))
            .groupBy('goals.id')
         )
      },
      goalsAchieved: function(){
         var goals = (
            knex
               .select('goals.id as ID')
               .select(knex.raw('(goals.amount - sum(sales.amount)) as amountTo'))
               .from('sales')
               .innerJoin(knex.raw('goals on (goals.startDate <= sales.createdAt AND goals.endDate >= sales.createdAt)'))
               .groupBy('goals.id')
               .having('amountTo','<=', 0)
            ).as('goals')
         
         return(
            knex
               .count(`goals.ID as goalsCompleted`)
               .from(goals)
         )
      },
      createCustomer: function(info) {
         return (knex('customers').insert({
               name: info.name,
               createdAt: new Date()
            })
            .then(function(customerInfo) {
               return knex('customers').select(`id`, 'name', 'createdAt').where('id', "=", customerInfo[0])
            })
            .then(customerReturn => customerReturn[0])
            .catch(function(err) {
               console.log(err, "   Alread existing in database");
            })
         )
      },
      createSale: function(info) {
         return knex('sales').insert({
               id: null,
               customer_id: info.customer_id,
               amount: info.amount,
               createdAt: new Date()
            }) //will this new Date () work?
            .then(function(saleInfo) {
               return knex('sales').select(`id`, 'customer_id', 'amount', 'createdAt').where('id', "=", saleInfo[0])
            })
            .then(saleReturn => saleReturn[0])
      },
      createCost: function(info) {
         return knex('costs').insert({
               id: null,
               customer_id: info.customer_id,
               amount: info.amount,
               createdAt: new Date()
            }) //will this new Date () work?
            .then(function(costInfo) {
               return knex('costs').select(`id`, 'customer_id', 'amount', 'createdAt').where('id', "=", costInfo[0])
            })
            .then(costReturn => costReturn[0])
      },
      createGoal: function(info) {
         return (
            knex('goals').insert({
               id: null,
               amount: info.amount,
               startDate: info.startDate || new Date(),
               endDate: info.endDate,
               createdAt: new Date()
            })
            .then(function(goalInfo) {
               return knex('goals').select('id', 'amount', 'startDate', 'endDate', 'createdAt', 'updatedAt').where('id', '=', goalInfo[0])
            })
            .then(goalReturn => goalReturn[0])
         )
      }
   }
}
