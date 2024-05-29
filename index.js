// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  var sDate = req.date.split("-");
  if(sDate.length > 1) {
    var year = sDate[0];
    var month = sDate[1];
    var day = sDate[2];
    res.json({
      unix: +new Date(year, month, day),
      utc: ""
    })
  } else {
    var date = new Date(req.date);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getYear();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds();
    var dtw = date.getDay()

    var formattedTime = dtw + " " + day + " " + month + " " + year + " " + time
    res.json({
      unix: req.date,
      utc: formattedTime
    })
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
