// Variables to confirm required npm packages
const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      morgan = require('morgan');

// Middleware to use
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Handling routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

// Setting the app up to listen on localhost
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Application is listening at port ' + listener.address().port);
})
