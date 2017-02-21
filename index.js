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

decodeBotAPI.costForGivenYear(2017).then(x=>console.log(x));

// app.get('/sales', function(request, response){
    
//     if(request.query.companyId){
//         decodeBotAPI
//         .customerSales(request.query.companyId)
//         .then(data=>{
//             response.json(data);
//         })
//     }
//     else{
//         decodeBotAPI
//         .allSaleInfo()
//         .then(data=>{
//             response.json(data); //returning all information in the Stringified format so that it can get passed through the http protocal
//         })
//     }
// })

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

app.get('/customers', function(request, response){
    decodeBotAPI
    .allCustomerInfo()
    .then(data=>{
        response.json(data);
    })
})



app.get('/reports', function(request, response){
    
})

// /costs/ company:id

// /companies/:id/costs