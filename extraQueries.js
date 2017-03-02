/* Extra queries to be used for future iterations */





module.exports = function ExtraQueries(knex) {
    return {
        //Queries used to group information by Time (Year or Month).
        // Dashboard is currently using some queries minus the time aspect

        //Total number of sales instances (not related to amount($) sold for)
        //For ALL Sales instances
        numberOfSales: function() {
            return (
                knex("sales").count("sales.id as Amount_Of_Sales")
            )
        },
        // Per Year
        numberOfSalesYear: function() {
            return (
                knex('sales')
                .count("sales.id as Amount_Of_Sales")
                .select(knex.raw(('YEAR(sales.createdAt) as Year')))
                .groupByRaw('YEAR(sales.createdAt)')
            )
        },
        // Per Month / Year
        numberOfSalesMonth: function() {
            return (
                knex('sales')
                .count("sales.id as Amount_Of_Sales")
                .select(knex.raw(('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year')))
                .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
            )
        },

        //Total number of cost instances (not related to amount($) sold for )
        //For all Costs instances
        totalNumberCost: function() {
            return (
                knex("costs").count('costs.id as Amount_Of_Costs')
            )
        },
        // Per Year
        totalNumberCostYear: function() {
            return (
                knex('costs').count('costs.id')
                .select(knex.raw('YEAR(costs.createdAt) as Year'))
                .groupByRaw("Year(costs.createdAt)")
            )
        },
        // Per Month 
        totalNumberCostMonth: function() {
            return (
                knex('costs').count('costs.id')
                .select(knex.raw('MONTH(costs.createdAt) as Month, YEAR(costs.createdAt) as Year'))
                .groupByRaw('YEAR(costs.createdAt), MONTH(costs.createdAt)')
            )
        },
        //Total Revenue
        // by YEAR(total dollar worth of sales)
        totalRevYear: function() {
            return (
                knex("sales")
                .sum('sales.amount as Total_Sales')
                .select(knex.raw('YEAR(sales.createdAt) AS Year'))
                .groupByRaw('YEAR(sales.createdAt)')
            )
        },
        // by Month/year (total dollar worth of sales)
        totalRevMonth: function() {
            return (
                knex('sales')
                .sum('sales.amount as Total_Sales')
                .select(knex.raw('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) AS Year'))
                .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
            )
        },
        //Average Deal Size
        //per YEAR(total sales amount / total sales)
        avgDealSizeYear: function() {
            return (
                knex('sales')
                .count('sales.id as Amount_Of_Sales')
                .sum('sales.amount as Total_Sales')
                .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount, YEAR(sales.createdAt) as Year"))
                .groupByRaw("YEAR(sales.createdAt)")
            )
        },
        //per Month(total sales amount / total sales)
        avgDealSizeMonth: function() {
            return (
                knex('sales')
                .count('sales.id as Amount_Of_Sales')
                .sum('sales.amount as Total_Sales')
                .select(knex.raw("ROUND(SUM(sales.amount)/COUNT(sales.id),2) as Avg_Sale_Amount, MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year"))
                .groupByRaw("YEAR(sales.createdAt), MONTH(sales.createdAt)")
            )
        },
        //Gross Profit Margin
        // Per Year
        grossProfitMarginYear: function(year) {
            return (
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
        //Per Month
        grossProfitMarginMonth: function(month, year) {
            return (knex.select(knex.raw(`ROUND((((
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
        //Queries are used to find information either about all customers
        // or specific custoemrs

        // Cost per customer    (table shows all customers)
        costPerCustomer: function() {
            return (
                knex('costs')
                .select('customers.name as Customer')
                .sum('costs.amount as Total_Cost')
                .innerJoin('customers', 'costs.customer_id', '=', 'customers.id')
                .groupBy('customers.id')
                .orderBy('Total_Cost', 'desc')
            )
        },
        // Cost for specific customer 
        //per year 
        customerCostYear: function(customerId) {
            return (
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
        // per MONTH 
        customerCostMonth: function(customerId) {
            return (
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
        //Revenue for specific customer
        // Per Year
        customerRevYear: function(customerId) {
            return (
                knex('sales')
                .select('customers.name as Customer')
                .sum('sales.amount as Total_Revenue')
                .select(knex.raw('YEAR(sales.createdAt) as Year'))
                .innerJoin('customers', 'sales.customer_id', '=', 'customers.id')
                .where('customers.id', customerId)
                .groupByRaw('YEAR(sales.createdAt)')
            )
        },
        //Per Month
        customerRevMonth: function(customerId) {
            return (
                knex('sales')
                .select('customers.name as Customer')
                .sum('sales.amount as Total_Revenue')
                .selet(knex.raw('MONTH(sales.createdAt) as Month, YEAR(sales.createdAt) as Year'))
                .innerJoin('customers', 'sales.customer_id', '=', 'customers.id')
                .where('customers.id', customerId)
                .groupByRaw('YEAR(sales.createdAt), MONTH(sales.createdAt)')
            )
        },
        //Query relating to cost and sales
        // Total Sales vs Total Cost
        salesVsCost: function() {
            return (
                knex.select(knex.raw('(SELECT SUM(sales.amount) FROM sales) AS Total_Sales, (SELECT ROUND(SUM(costs.amount),2) FROM costs) AS Total_Cost'))
            )
        },
        // Total Cost Per Sale (Sum of cost divided by amount individual sales)
        costPerSale: function() {
            return (
                knex.select(knex.raw('ROUND((SELECT SUM(costs.amount) FROM costs) / (SELECT COUNT(sales.id) FROM sales),2) as Cost_Per_Sale'))
            )
        }
    }
}
