var express = require('express');
var app = express();

app.use(express.static('public'));
app.get("/cities", function(req, res){
  var cities = ['Boston', 'New York', 'Providence', 'Warwick'];
  res.json(cities);
});

app.listen(3000);