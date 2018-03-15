var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var exphbs = require("express-handlebars");
var db = require('./models');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes.js")(app)
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongooseNYT";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(port);
console.log("App now listening at localhost:" + port);

