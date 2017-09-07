// Let's start coding our Express application.
// Task 1/6 In our app.js, require the express module and assign it to the express variable.
// Task 2/6 Using the function assigned to express, create an application instance and assign it to the app variable.
// Task 3/6 Using our application instance, app, create a new route that accepts GET requests on the /locations URL path. Remember to pass a callback function which takes a request and response.
// Task 4/6 Respond with an array of city names. The city names should be Caspiana, Indigo and Paradise.
// Task 5/6 Bind our application to port 3001.
// Task 6/6 When our application is ready to receive requests, print the string "Running Express" to the console.
var express = require('express');
var app = express();
 app.get('/locations', function(request, response) {
   var cities = ['Caspiana', 'Indigo', 'Paradise'];
   response.json(cities);
 });
app.listen(3001, function() {
  console.log('Running Express');
});

//In order to better reflect the domain of our application, we want to change our existing route from /locations to /cities.
var express = require('express');
var app = express();

app.get('/cities', function (request, response) {                                                                                                     
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.send(cities);
});
app.get('/locations', function(request,response){
  response.redirect(301,'/cities');
});


app.listen(3001, function () {
  console.log("Running Express");
});
