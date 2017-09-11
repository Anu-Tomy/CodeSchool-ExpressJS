//Route Instance
//Create a new Route Instance for the '/cities' URL path and assign it to the citiesRoute variable.
//Move the code from our previous app.get() route to a new GET route on the citiesRoute object.
//Move app.post() to citiesRoute.
//Get rid of the citiesRoute temporary variable and use chaining function calls.
//Finally, let's move the old routes for the '/cities/:name' URL path to use the new Route Instance API.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
// In memory store for the cities in our application
var cities = {};

app.route('/cities')
.get(function (request, response) {
  if(request.query.search) {
    response.json(citySearch(request.query.search));
  } else {
    response.json(cities);
  }
})
.post(parseUrlencoded, function (request, response) {
  if(request.body.description.length > 4) {
    var city = createCity(request.body.name, request.body.description);
    response.status(201).json(city);
  } else {
    response.status(400).json('Invalid City');
  }
});

// GET route for /cities


// POST route for /cities


// GET route for /cities/:name
app.route('/cities/:name')
.get(function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json('City not found');
  }
})

// DELETE route for /cities/:name
.delete(function (request, response) {
  if(cities[request.cityName]) {
    delete cities[request.cityName];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var result = null;
  var search = RegExp(keyword, 'i');
  for(var city in cities) {
    if(search.test(cities[city])) {
      return city;
    }
  }
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

app.listen(3000);

//Using a Router Instance
//Refactor app.js to use a Router object.
    //Create a new router object and assign it to the router variable.
    //When we are done, our router will be mounted on the /cities path. 
    //With this in mind, change app.route('/cities') to use router and map requests to the root path.
    //Likewise, let's move our '/cities/:name' route to our router. Remember to update the path.
    //Our router is now ready to be used by app. Mount our new router under the /cities path.
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the
// cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.param('name', function (request, response, next) {
  request.cityName = parseCityName(request.params.name);
});

var router = express.Router();

router.route('/')
  .get(function (request, response) {
    if(request.query.search){
      response.json(citySearch(request.query.search));
    }else{
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4){
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    }else{
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')
  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo){
      response.json(cityInfo);
    }else{
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]){
      delete cities[request.cityName];
      response.sendStatus(200);
    }else{
      response.sendStatus(404);
    }
  });
app.use('/cities', router);


// Searches for keyword in description
// and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the
// in memory store
function createCity(name, description){
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.listen(3000);

// Using All
//Use the app.all() method to handle the name parameter instead of app.param().
//Tasks
    //Add a call to all() for our router's '/:name' route. 
    //Pass a callback function that accepts request, response, and next.
    //Take our logic from the callback function passed to app.param() and move it to our all() callback.
    //Remove the original call to app.param()
    
    var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}



var router = express.Router();

router.route('/')
  .get(function (request, response) {
    if(request.query.search) {
      response.json(citySearch(request.query.search));
    } else {
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4) {
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    } else {
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')
  .all(function(req, res, next){
  request.cityName = parseCityName(request.params.name);
})

  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo) {
      response.json(cityInfo);
    } else {
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]) {
      delete cities[request.cityName];
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });

app.use('/cities', router);

app.listen(3000);

