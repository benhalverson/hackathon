var express = require("express")
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

//another way of connecting to mongo database
//mongoose.connect("mongodb://localhost/:dbname");

var mongoose = require("mongoose");
var uriUtil = require("mongodb-uri");
// mongodb options
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

//localhost code
//var mongodbUri = "mongodb://localhost:27017";
var mongodbUri = "mongodb://admin:admin123@ds053419.mongolab.com:53419/heroku_app28010960";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function() {
    console.log("connected to the server!")

});

// creating a model for mongodb
var Order = mongoose.model('hackathon', {
    name: String,
    description: String,
    address: String,
    city: String,
    state: String,
    zipcode: String
});

//query the database
app.get("/", function(req, res){
    Order.find(function(err, order) {
        console.log("order from server " + order);
        res.send(order);
    });

//posting to mongo database
app.post("/add", function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipcode = req.body.zipcode;
    console.log("name in post " +name.name);
    console.log("body content = " + JSON.stringify(req.body));
    var order = new Order(
        {   name: name.name,
            description: name.description,
            address: name.address,
            city: name.city,
            state: name.state,
            zipcode: name.zipcode
        });
    order.save(function(err) {
        if(err) {
            console.log("Error! ", err);
        }else
        {
            console.log("Saved");
        }
    });
     var order = Order(
        {name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode
        });
    order.save(function (err) {
        res.send();
    })
});
});
var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log("Listening on " + port);
});