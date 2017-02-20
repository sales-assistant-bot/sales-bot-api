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


decodeBotAPI.totalRevMonth().then(x=>console.log(x));