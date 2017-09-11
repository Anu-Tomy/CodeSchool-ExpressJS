var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.post('/blocks', parseUrlencoded, function (request, response) {
  var newBlock = request.body;
  blocks[newBlock.name] = newBlock.description;
  response.status(201).json(newBlock.name);
});

app.listen(3000);
//app.listen(process.env.PORT, function(){
  //  console.log('Listening on port ' + process.env.PORT + '\n');
//});

// 4.6 Delete Route 250 pts

// Create a Dynamic Route for deleting blocks and handle for cities that are not in our list.
// Task 1/4 Create a DELETE route that takes the city name as its first argument, followed by a callback that takes a request and response objects as arguments.
// Task 2/4 Use the built-in JavaScript operator delete (see MDN docs) to remove the property for the city passed as an argument. Don't forget to use the attribute set in app.param() to look the city up. 
// Task 3/4 Use sendStatus() to respond back with a status code of 200.
// Task 4/4 Add an if block that checks whether the cityName provided from app.param() has a valid entry before attempting to delete it from the cities object. If a valid city is not found, then respond with a 404 HTTP status code using the sendStatus() function.

// var express = require('express');
// var app = express();

// var cities = {
//   'Lotopia': 'Rough and mountainous',
//   'Caspiana': 'Sky-top island',
//   'Indigo': 'Vibrant and thriving',
//   'Paradise': 'Lush, green plantation',
//   'Flotilla': 'Bustling urban oasis'
// };

// app.param('name', function (request, response, next) {
//   request.cityName = parseCityName(request.params.name);
// });
       
// app.delete('/cities/:name', function(request, response){
//   if(cities[request.cityName]){
//     delete cities[request.cityName];
//     response.sendStatus(200);
//   } else {
//     response.sendStatus(404);
//   }

// });

// app.listen(process.env.PORT, function(){
//     console.log('Listening on port ' + process.env.PORT + '\n');
// });

// function parseCityName(name) {
//   var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
//   return parsedName;
// }
