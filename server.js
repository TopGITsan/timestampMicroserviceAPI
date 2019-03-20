// server.js
// where node app starts

// init project
const express = require('express');
const moment = require('moment');
const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204


// root level middleware - A logger
app.use((req, res, next) => {
  console.log(req.method + ' @ ' + req.path + ' - ' + req.ip);
  next();
});


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  let input = req.params.date_string;
  if (input === undefined) {
    console.log('No input: ' + input);
    req.time = new Date();
    res.send({ "unix": req.time.getTime(), "utc": req.time.toUTCString() });
  } else {
    if (isNaN(input)) {
      console.log('Input is NOT a number: ' + input);
      if (moment(input).isValid() == true) {
        console.log('Input is a valid date: ' + input);
        req.time = new Date(input);
        res.send({ "unix": req.time.getTime(), "utc": req.time.toUTCString() });
      } else {
        console.log('Input is NOT a valid date: ' + input);
        res.json({ "error": "Invalid Date" });
      }
    } else {
      console.log('Input is a number: ' + input);
      req.time = new Date(input * 1);
      console.log(req.time);
      res.send({ "unix": input, "utc": req.time.toUTCString() });
    }
  }
});

// listen for requests :)
const port = process.env.PORT || 3000;
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  // console.log('Your app is listening on port '+ port);
});
