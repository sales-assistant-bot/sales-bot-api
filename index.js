var _ = require('lodash')
var express = require('express');
var app = express();
var body_parser = require("body-parser");

var knex = require("knex")({
    dialect: 'mysql',
    connection: {
        host: 'localhost',
        user: "ajdez",
        database: 'new_decode_bot'
    }
});

var decodeBotAPI = require("./backend")(knex)

app.use(body_parser.json());
/* Is this below needed?*/
app.use(body_parser.urlencoded({
    extended: true
}));




app.get("/", function(request, response) {
    response.send(`<h1> Hello </h1>`)
})

app.get('/sales', function(request, response) {
    if (!_.isEmpty(request.query)) {
        if (request.query.name) {
            decodeBotAPI
                .customerSales(request.query.name)
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.year) {
            decodeBotAPI
                .salesForGivenYear(request.query.year)
                .then(data => {
                    response.json(data);
                })
        }
    }
    else {
        decodeBotAPI
            .allSaleInfo()
            .then(data => {
                response.json(data); //returning all information in the Stringified format so that it can get passed through the http protocal
            })
    }
})

app.get('/expenses', function(request, response) {
    if (!_.isEmpty(request.query)) {
        if (request.query.companyId) {
            decodeBotAPI
                .customerCost(request.query.companyId)
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.year) {
            decodeBotAPI
                .costForGivenYear(request.query.year)
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.costPerCustomer) {
            decodeBotAPI
                .costPerCustomer()
                .then(data => {
                    response.json(data);
                })
        }
    }
    else {
        decodeBotAPI
            .allSaleInfo()
            .then(data => {
                response.json(data);
                //same as writing  "response.send(JSON.stringify(data))"
            })
    }
})

//Put more queries attached to the customers
app.get('/company', function(request, response) {
    if (!_.isEmpty(request.query)) {
        if (request.query.name) {
            decodeBotAPI
                .customerInfoByName(request.query.name)
                .then(data => {
                    response.json(data);
                })
        }
    }
    else {
        decodeBotAPI
            .allCustomerInfo()
            .then(data => {
                response.json(data);
            })
    }
})

app.get('/goals', function(request, response) {
    decodeBotAPI
        .allGoalInfo()
        .then(data => {
            response.json(data);
        })
})

/*IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII*/
/*IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII*/


app.post("/company", function(request, response) {
    if (!request.body.name) {
        response.json({
            error: 'no name query string provided, please use ?name=NAME'
        });
    }
    decodeBotAPI
        .createCustomer(request.body)
        .then(newUser => {
            response.json(newUser);
        })
        .catch(console.log)
})


app.post("/sales", function(request, response) {
    if (!request.body.customer_id) {
        response.json({
            error: "must connect sale to specific customer. Please add the customer_id"
        })
    }
    decodeBotAPI
        .createSale(request.body)
        .then(newSale => {
            response.json(newSale);
        })
})


app.post("/expenses", function(request, response) {
    if (!request.body.customer_id) {
        response.json({
            error: "Must connect expense to specific customer. Please add the customer_id"
        })
    }
    decodeBotAPI
        .createCost(request.body)
        .then(newCost => {
            response.json(newCost);
        })
})

app.post("/goals", function(request, response) {
    if (!request.body.amount) {
        response.json({
            error: "Please enter a Goal"
        })
    }
    else if (!request.body.endDate) {
        response.json({
            error: "please enter a date in which the goal ends"
        })
    }
    else {
        decodeBotAPI
            .createGoal(request.body)
            .then(newGoal => {
                response.json(newGoal);
            })
    }
})

/* IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII*/
/* IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII */



app.get('/reports', function(request, response) {
    if (!_.isEmpty(request.query)) {
        if (request.query.totalRev !== undefined) {
            //total revenue (from all years)
            decodeBotAPI
                .totalRev()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.totalExpenses !== undefined) {
            //total expenses
            decodeBotAPI
                .totalExpenses()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.avgDealSize !== undefined) {
            //average deal size
            decodeBotAPI
                .avgDealSize()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.topClients !== undefined) {
            decodeBotAPI
                .topClients()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.profits !== undefined) {
            decodeBotAPI
                .profits()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.grossProfitMargin !== undefined) {
            //gross profit margin since beg of time
            decodeBotAPI
                .grossProfitMargin()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.barChartQuery !== undefined) {
            decodeBotAPI
                .barChartQuery()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.tableChart !== undefined) {
            decodeBotAPI
                .tableChart()
                .then(data => {
                    response.json(data);
                })
        }
        else if (request.query.goalGauge !== undefined) {
            decodeBotAPI
                .goalGauge()
                .then(data => {
                    response.json(data)
                })
        }
        else if (request.query.goalsAchieved !== undefined){
            decodeBotAPI
                .goalsAchieved()
                .then(data=>{
                    response.json(data)
                })
        }
    }
    else {
        response.send(`<h1>Pick a type of report to generate</h1>`)
    }
})


// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
