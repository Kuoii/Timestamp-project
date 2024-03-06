// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
    console.log(`Dejt now ${new Date()}`);
    const unix = Date.now();
    const utc = new Date().toUTCString();
    res.json({ unix: unix, utc: utc });
});

app.get("/api/:date?", (req, res) => {
    //console.log(new Date(req.params.date * 1));
    let date;
    if (new Date(req.params.date) != "Invalid Date") {
        date = new Date(req.params.date);
    } else if (new Date(req.params.date * 1) != "Invalid Date") {
        date = new Date(req.params.date * 1);
    } else {
        res.json({ error: "Invalid Date" });
    }
    let utc = date;
    let unix = utc.getTime();
    res.json({ unix: unix, utc: utc.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
