// CodeSchool Express Level 1
// Create a simple express node app meeting the following requirements
// Requirements
// Create an express app.
// Create a root route that returns “Hello World”
// Create a ‘/name’ route that returns your name
// Create a /redirect route that sends you to /suprise with a moved permanently status code

var express = require('express');
var app = express();
app.get('/', function(request,response){
    response.send('Hello World');
});

app.get('/name', function(request,response){
    response.send('Hello Anu');
});

app.get('/redirect', function(request,response){
    response.redirect(301,'/surprise');
});

app.listen(3000, function () {
  console.log("Running Express");
});