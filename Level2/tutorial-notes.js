// level 2 How Middleware Works
var express = require('express');
var app = express();

app.get('/', function(request, response){
 response.sendFile(__dirname + '/public/index.html'); // __dirname is the name of the directory the currently executing script resides in.
}).listen(3000);

// app.use function adds middleware to the application stack
// using express.static middleware.It serves files from the 'public' folder
app.use(express.static('public'));

// when next() is called, processing moves to the next middleware

app.use(function(request, response, next){
    // ...
    next();
})

app.use(function(request, response, next){
    // ...
response.send('done!'); // the flow stops once the response is sent back to the client
    next();  // calling next after the response has completed will cause errors
})

// node.js module system follows the CommonJS specification
// in logger.js
module.exports = function(request, response, next){
    var start = +new Date(); // plus sign converts date Object to milliseconds
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;
    response.on('finish', function(){    //'finish' event is emitted when the response has been handed off to the OS
        var duration = +new Date() - start;
        var message = method + ' to ' + url + 
            '\ntook' + duration + ' ms \n\n';
            stream.write(message);
    });
    next();
}