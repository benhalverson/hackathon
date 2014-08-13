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
var listing = mongoose.model('hackathon', {
    name: String,
    description: String,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
    logoURL: String,
    website: String,
    date: Date,
    type: String,
    api: Number,
    prize: Number,
    price: Number,
    duration: String
});

//query the database
app.get("/", function(req, res){
    listing.find(function(err, listing) {
        console.log("listing from server " + listing);
        res.send(listing);
    });

//posting to mongo database
app.post("/add", function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipcode = req.body.zipcode;
    var logoURL = req.body.logoURL;
    var website = req.body.website;
    var date = req.body.date;
    var type = req.body.type;
    var api = req.body.api;
    var prize = req.body.prize;
    var price = req.body.price;
    var duration = req.body.duration;

    //console.log("name in post " +name.name);
    console.log("body content = " + JSON.stringify(req.body));
    var listing = new Listing(
        {   name: name.name,
            description: name.description,
            address: name.address,
            city: name.city,
            state: name.state,
            zipcode: name.zipcode,
            logoURL: name.logoURL,
            website: name.website,
            date: name.date,
            type: name.type,
            api: name.api,
            prize: name.prize,
            price: name.price,
            duration: name.duration
        });
    listing.save(function(err) {
        if(err) {
            console.log("Error! ", err);
        }else
        {
            console.log("Saved");
        }
    });
     var listing = Listing(
        {name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            logoURL: logoURL,
            website: website,
            date: date,
            type: type,
            api: api,
            prize: prize,
            price: price,
            duration: duration
        });
    listing.save(function (err) {
        res.send();
        console.log("saving to database")
    })
});
   //remove a listing
//    app.post("/remove", function (req, res) {
//        res.send("removing stub");
//    });



});
var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log("Listening on " + port);
});