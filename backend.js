// var knex = require('knex')({
//    dialect: 'mysql',
//    connection: {
//       database: 'DECODE_BOT'
//    }
// });

module.exports = function DecodeBotAPI(knex){
   return{
      //get all sale info
      allSaleInfo: function(){
         return(
            knex('sales').select('*')
         )
      },
      //All cost instances for user
      allCostInfo: function(){
         return(
            knex('costs').select("*")
         )
      },
      //all customer info for user
      allCustomerInfo: function(){
         return(
            knex('customers').select("*")
         )
      },
      customerInfoByName: function(companyName){
         return(
            knex('customers').select('id').where("customers.name", '=', companyName)   
         )
      },
      // Total number of sales
      numberOfSales: function(){
         return (
            knex("sales").count("sales.id as Amount_Of_Sales")
         )
      },
      //list of sales instances for given customer
      customerSales: function(customerName){
         return(
            knex('sales')
            .select(`id`, `name`)
            .innerJoin("customers", "sales.customer_id", '=', 'customers.id')
            .where('name','=', customerName)
         )
      },
      //list of cost/expensees instance for given customer
      customerCost: function(customerId){
         return (
            knex('costs')
            .select('*')
            .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
            .where('customers.id', customerId)
         )
      },
      salesForGivenYear:function(year){
         return(
            knex('sales')
            .select("*")
            .whereRaw(`YEAR(sales.createdAt) = ${year}`)
         )
      },
      costForGivenYear: function(year){
         return(
            knex('costs')
            .select('*')
            .whereRaw(`YEAR(costs.createdAt) = ${year}`)
         )
      },
      /* Per Year */
      numberOfSalesYear: function(){
         return (
            knex('sales')
               .count("sales.id as Amount_Of_Sales")
               .select(knex.raw(('YEAR(sales.createdAt) as Year')))
                  .groupByRaw('YEAR(sales.createdAt)')
         )
      },
         /* Per Month / Year */
      numberOfSalesMonth: function(){
         return(
            knex('sales')
            .count("sales.id as Amount_Of_Sales")
            .select(knex.raw(('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year')))
               .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
         )
      },
      //Total number of cost
      totalNumberCost: function(){
         return(
            knex("costs").count('costs.id as Amount_Of_Costs')
         )
      },
      /* Per Year    */
      totalNumberCostYear: function(){
       return(
         knex('costs').count('costs.id')
         .select(knex.raw('YEAR(costs.createdAt) as Year'))
         .groupByRaw("Year(costs.createdAt)")
         )
      },
      /* Per Month / Year      */
      totalNumberCostMonth: function(){
         return(
            knex('costs').count('costs.id')
            .select(knex.raw('MONTH(costs.createdAt) as Month, YEAR(costs.createdAt) as Year'))
            .groupByRaw('YEAR(costs.createdAt), MONTH(costs.createdAt)')
         )
      },
      // Total Revenue (total dollar worth of sales)
      totalRev: function(){
         return(
            knex("sales").sum('sales.amount as Total_Sales')
            .then(function(data){
               return data[0];
            })
         )
      },
      // Total Revenue by YEAR(total dollar worth of sales)
      totalRevYear: function(){
         return(
            knex("sales")
               .sum('sales.amount as Total_Sales')
               .select(knex.raw('YEAR(sales.createdAt) AS Year'))
               .groupByRaw('YEAR(sales.createdAt)')
         )
      },
      // Total Revenue by Month/year (total dollar worth of sales)
      totalRevMonth: function(){
         return(
            knex('sales')
               .sum('sales.amount as Total_Sales')
               .select(knex.raw('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) AS Year'))
               .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
         )
      },
      totalExpenses: function(){
         return(
            knex('costs')
               .sum('costs.amount as Total_Expenses')
               .then(function(data){
                  return data[0];
               })
         )
      },
      //Average Deal Size (total sales amount / total sales)
      avgDealSize: function(){
         return(
            knex('sales')
               .count('sales.id as Amount_Of_Sales')
               .sum('sales.amount as Total_Sales')
               .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount"))
         )
         .then(data=>data[0])
      },
      //Average Deal Size per YEAR(total sales amount / total sales)
      avgDealSizeYear: function(){
         return(
            knex('sales')
               .count('sales.id as Amount_Of_Sales')
               .sum('sales.amount as Total_Sales')
               .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount, YEAR(sales.createdAt) as Year"))
               .groupByRaw("YEAR(sales.createdAt)")
         )
      },
      //Average Deal SIze per Month(total sales amount / total sales)
      avgDealSizeMonth: function(){
         return(
            knex('sales')
               .count('sales.id as Amount_Of_Sales')
               .sum('sales.amount as Total_Sales')
               .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount, MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year"))
               .groupByRaw("YEAR(sales.createdAt), MONTH(sales.createdAt)")
         )
      },
      // Total Sales vs Total Cost     //We are double counting the Total Sales and Total Cost,  should we divide by 2 or use distinct
      salesVsCost: function(){
         return(
            knex.select(knex.raw('(SELECT SUM(sales.amount) FROM sales) AS Total_Sales, (SELECT ROUND(SUM(costs.amount),2) FROM costs) AS Total_Cost'))
         )
      },
      // Revenue for specific customer PER YEAR      (TABLE)    //WORKS//
      customerRevenueYear: function(customerId){
         return(
            knex('sales')
            .select('customers.name as Customer')
            .sum('sales.amount as Total_Revenue')
            .select(knex.raw('YEAR(sales.createdAt) as Year'))
            .innerJoin('customers', 'sales.customer_id', '=', 'customers.id')
            .where('customers.id', customerId)
            .groupByRaw('YEAR(sales.createdAt)')
         )
      },
      // Revenue for specific customer PER MONTH      (TABLE)    //WORKS//
      customerRevenueMonth: function(customerId){
         return(
            knex('sales')
            .select('customers.name as Customer')
            .sum('sales.amount as Total_Revenue')
            .select(knex.raw('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year'))
            .innerJoin('customers', 'sales.customer_id', '=', 'customers.id')
            .where('customers.id', customerId)
            .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
         )
      },
      // Cost per customer    (table shows all customers)
      costPerCustomer: function(){
         return(
            knex('costs')
               .select('customers.name as Customer')
               .sum('costs.amount as Total_Cost')
               .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
               .groupBy('customers.id')
               .orderBy('Total_Cost', 'desc')
         )
      },
      // Cost for specific customer per year   (table)
      customerCostYear: function(customerId){
         return(
            knex('costs')
               .select('customers.name as Name')
               .sum('costs.amount as Total_Cost')
               .select(knex.raw('YEAR(costs.createdAt) as Year'))
               .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
               .where('customers.id', customerId)
               .groupByRaw('YEAR(costs.createdAt)')
               .orderBy('Year', 'desc')
         )
      },
      // Cost for specific customer per MONTH   (table)
      customerCostMonth: function(customerId){
         return(
            knex('costs')
               .select('customers.name as Name')
               .sum('costs.amount as Total_Cost')
               .select(knex.raw('MONTH(costs.createdAt) as Month, YEAR(costs.createdAt) as Year'))
               .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
               .where('customers.id', customerId)
               .groupByRaw('YEAR(costs.createdAt), MONTH(costs.createdAt)')
               .orderBy('Year', 'Month', 'desc')
         )
      },
      // Total Cost Per Sale (Sum of cost divided by amount individual sales)
      costPerSale: function(){
         return(
            knex.select(knex.raw('ROUND((SELECT SUM(costs.amount) FROM costs) / (SELECT COUNT(sales.id) FROM sales),2) as Cost_Per_Sale'))
         )
      },
      profits: function(){
         return(
            knex.select(knex.raw(`((select SUM(sales.amount) from sales) - (select SUM(costs.amount) from costs)) as Profit`))
         )
         .then(data => data[0])
      },
      barChartQuery: function(){
         var baseQuery = (
            knex
            .select('all_months.name as Month')
            .select(knex.raw('COALESCE(SUM(sales.amount), 0) as Sales'))
            .select(knex.raw('COALESCE(SUM(costs.amount), 0) as Costs'))
            .from('all_months')
            .leftJoin(`sales`,'all_months.id', knex.raw('MONTH(sales.createdAt)'))
            .leftJoin('costs', 'all_months.id', knex.raw('MONTH(costs.createdAt)'))
            .groupByRaw('all_months.id')
            .orderBy('all_months.id')
         ).as('baseQuery');
         
         return knex.select('Month', 'Sales', 'Costs', knex.raw('Sales - Costs AS Profits')).from(baseQuery);
      },
      tableChart: function(){
        return(
            knex('sales')
            .select('customers.name as Customers', 'sales.amount as Sales', 'sales.createdAt as Dates')
            .innerJoin('customers', 'customers.id', '=', 'sales.customer_id')
          ) 
      },
      //Gross Profit Margin ((Total Rev - Total Cost)/Total Revenue)    %%%%%%
      /*For ALL DATA */
      grossProfitMargin: function(){
         return(
            knex.select(knex.raw(`ROUND((((SELECT SUM(sales.amount)
                                          FROM sales) - (
                                             SELECT SUM(costs.amount)
                                             from costs))/(
                                                SELECT SUM(sales.amount)
                                                FROM sales))*100, 2) AS Gross_Profit_Margin_Percent`))
         )
         .then(function(data){
            return data[0];
         })
      },
      /* /////////////////////////////USING Year ///////////////////////////////////////////// */
      grossProfitMarginYear: function(year){
         return(
            knex.select(knex.raw(
               `ROUND((((SELECT SUM(sales.amount)
                  FROM sales WHERE YEAR(sales.createdAt) = "${year}") -
                     (SELECT SUM(costs.amount)
                     from costs
                     WHERE YEAR(costs.createdAt) = "${year}"))/(
                           SELECT SUM(sales.amount)
                           FROM sales
                           WHERE YEAR(sales.createdAt) = "${year}"))*100, 2) AS Gross_Profit_Margin_Percent`))
         )
      },
      /* ///////////////////////////////USING MONTH + Year ////////////////////////////////////////// */
      grossProfitMarginMonth: function(month, year){
         return(knex.select(knex.raw(`ROUND((((
           SELECT SUM(sales.amount)
           FROM sales
           WHERE YEAR(sales.createdAt) = "${year}"
           AND MONTH(sales.createdAt) = "${month}") - (
             SELECT SUM(costs.amount)
             from costs
             WHERE YEAR(costs.createdAt) = "${year}"
             AND MONTH(costs.createdAt) = "${month}"))/(
               SELECT SUM(sales.amount)
               FROM sales
               WHERE YEAR(sales.createdAt) = "${year}"
               AND MONTH(sales.createdAt) = "${month}"))*100, 2)
               AS GPM_m${month}_y${year}`)))
      },
      topClients: function(){
         return(
            knex('customers')
         .select(`customers.name as CompanyName`)
         .sum('sales.amount as TotalSales')
         .innerJoin('sales', 'sales.customer_id', '=', 'customers.id')
         .groupBy('customers.id')
         )
      },
      
      
      
      
      
      
      createCustomer: function(info){
         return (knex('customers').insert({name: info.name})
            .then(function(customerInfo){
               return knex('customers').select(`id`, 'name').where('id',"=", customerInfo[0])
            })
            .then(customerReturn=> customerReturn[0])
            .catch(function(err){
               console.log(err, "   Alread existing in database");
            })
         )
      },
      createSale: function(info){
         return knex('sales').insert({id: null, customer_id: info.customer_id, amount: info.amount, createdAt: new Date()}) //will this new Date () work?
            .then(function(saleInfo){
               return knex('sales').select(`id`, 'customer_id', 'amount', 'createdAt').where('id',"=", saleInfo[0])
            })
            .then(customerReturn=> customerReturn[0])
      },
      createCost: function(info){
         return knex('costs').insert({id: null, customer_id: info.customer_id, amount: info.amount, createdAt: new Date()}) //will this new Date () work?
            .then(function(costInfo){
               return knex('costs').select(`id`, 'customer_id', 'amount', 'createdAt').where('id',"=", costInfo[0])
            })
            .then(customerReturn=> customerReturn[0])
      }
   }
}
