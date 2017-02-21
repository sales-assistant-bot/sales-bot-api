var express = require('express');
var app = express();
var body_parser = require("body-parser");

var knex = require("knex")({
   dialect: 'mysql',
   connection: {
      host:'localhost',
      user:"ajdez",
       database: 'new_decode_bot'
   }
});

var decodeBotAPI = require("./backend")(knex)

app.get("/", function(request,response){
    response.send(`<h1> Hello </h1>`)
})

app.get('/sales', function(request, response){
    if(request.query){
        if(request.query.companyId){
            decodeBotAPI
            .customerSales(request.query.companyId)
            .then(data=>{
                response.json(data);
            })
        }
        else if(request.query.year){
            decodeBotAPI
            .salesForGivenYear(request.query.year)
            .then(data=>{
                response.json(data);
            })
        }
    }
    else{
        decodeBotAPI
        .allSaleInfo()
        .then(data=>{
            response.json(data); //returning all information in the Stringified format so that it can get passed through the http protocal
        })
    }
})

app.get('/costs', function(request, response){
    if(request.query){
        if(request.query.companyId){
            decodeBotAPI
            .customerCost(request.query.companyId)
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.year){
            decodeBotAPI
            .costForGivenYear(request.query.year)
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.costPerCustomer){
            decodeBotAPI
            .costPerCustomer()
            .then(data=>{
                response.json(data);
            })
        }
    }
    else{
        decodeBotAPI
        .allSaleInfo()
        .then(data=>{
            response.json(data);
            //same as writing  "response.send(JSON.stringify(data))"
    })
}
    
    
})

//Put more queries attached to the customers
app.get('/customers', function(request, response){
    decodeBotAPI
    .allCustomerInfo()
    .then(data=>{
        response.json(data);
    })
})



app.get('/reports', function(request, response){
    if(request.query){
        if(request.query.numberOfSales){
            decodeBotAPI
            .numberOfSales()
            .then(data=>{
                response.json(data);
            })
        }
        else if(request.query.numberOfSalesYear){
            decodeBotAPI
            .numberOfSalesYear()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.numberOfSalesMonth){
            decodeBotAPI
            .numberOfSalesMonth()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalNumberCost){
            //total instances of cost
            decodeBotAPI
            .totalNumberCost()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalNumberCostYear){
            //total instances of cost by year
            decodeBotAPI
            .totalNumberCostYear()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalNumberCostMonth){
            //total instances of cost by month
            decodeBotAPI
            .totalNumberCostMonth()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalRev){
            //total revenue (from all years)
            decodeBotAPI
            .totalRev()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalRevYear){
            //total revenue by year
            decodeBotAPI
            .totalRevYear()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.totalRevMonth){
            //total revenue (from all years)
            decodeBotAPI
            .totalRevMonth()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.avgDealSize){
            //average deal size
            decodeBotAPI
            .avgDealSize()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.avgDealSizeYear){
            //average deal size by year
            decodeBotAPI
            .avgDealSizeYear()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.avgDealSizeMonth){
            //average deal size by month, year
            decodeBotAPI
            .avgDealSizeMonth()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.salesVsCost){
            //This query will be useful for graphs
            decodeBotAPI
            .salesVsCost()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.customerRevenueYear){ //Needs customer ID as input
            decodeBotAPI
            .customerRevenueYear(request.query.customerRevenueYear) //NEEDS customer.id AS INPUT
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.customerRevenueMonth){ //Needs customer ID as input
            decodeBotAPI
            .customerRevenueMonth(request.query.customerRevenueMonth)//NEEDS customer.id AS INPUT
            .then(data=>{
                response.json(data);
            })
        }
        // else if (request.query.customerCostYear){
        //     decodeBotAPI
        //     .customerCostYear(request.query.customerCostYear)//NEEDS customer.id AS INPUT
        //     .then(data=>{
        //         response.json(data);
        //     })
        // }
        else if (request.query.customerCostMonth){
            decodeBotAPI
            .customerCostMonth(request.query.customerCostMonth)//NEEDS customer.id AS INPUT
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.costPerSale){
            decodeBotAPI
            .costPerSale()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.grossProfitMargin){
            //gross profit margin since beg of time
            decodeBotAPI
            .grossProfitMargin()
            .then(data=>{
                response.json(data);
            })
        }
        else if (request.query.grossProfitMarginYear){
            //gross profit margin since beg of time
            decodeBotAPI
            .grossProfitMarginYear(request.query.grossProfitMarginYear)
            .then(data=>{
                response.json(data);
            })
        }
        /* How do I get access to both month and year in query string */
        // else if (request.query.grossProfitMarginMonth){
        //     //gross profit margin since beg of time
        //     decodeBotAPI
        //     .grossProfitMarginMonth(request.query.grossProfitMarginMonth)
        //     .then(data=>{
        //         response.json(data);
        //     })
        // }
    }
    else{
        decodeBotAPI
        .totalRev()
        .then(data=>{
            response.json(data);
        })
    }
})
