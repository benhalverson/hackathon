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
var Listing = mongoose.model('hackathon', {
    name: String,
    description: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    logoURL: String,
    website: String,
    date: String,
    type: String,
    api: Number,
    prize: Number,
    price: Number,
    duration: String
});

//query the database
app.get("/", function(req, res){
    Listing.find({},function(err, listing) {
        console.log("listing from server " + listing);
        res.send(listing);
    });

//posting to mongo database
    app.post("/add", function (req, res) {

        var listing = new Listing(
            {   
                name: req.body.name,
                description: req.body.description,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                logoURL: req.body.logoURL,
                website: req.body.website,
                date: req.body.date,
                type: req.body.type,
                api: req.body.api,
                prize: req.body.prize,
                price: req.body.price,
                duration: req.body.duration
            });
        listing.save(function(err) {
            if(err) {
                console.log("Error! ", err);
            }else
            {
                console.log("Saved");
            }
        });
    });
});


//update a single listing by ID
// app.post('/update/:id/:name/:desc/:city/:state/:zipcode/:date/:logoURL/:website/:type/:api/:prize/:price/:duration', function(req, res){
   
//     var date = req.params.date;
//     var year = date.slice(0,4);
//     var month = date.slice(5,7);
//     var day = date.slice(8,10);
//     date = month + "/" + day + "/" + year;

//    Listing.findByIdAndUpdate( {_id: req.params.id},
//         {
//           name: req.body.name,
//           description: req.body.desc,
//           city: req.body.city,
//           state: req.body.state,
//           zipcode: req.body.zipcode,
//           logoURL: req.body.logoURL,
//           website: req.body.website,
//           date: date,
//           type: req.body.type,
//           api: req.body.api,
//           prize: req.body.prize,
//           price: req.body.price,
//           duration: req.body.duration
//       }, function (err){
//         if(err) { 
//             res.send(err);
//         }
//       });

//    res.send('hit update endpoint id=' + req.params.id + " name = " + req.params.name + "date = " + req.params.date);
// });



    app.post("/remove/:id", function (req, res) {
        var id = req.params.id;
        //var id = "541130b8cecd6d0200679737";
        Listing.remove({"_id": id},function(err) {
            console.log("remove from server ");

          //  res.send(listing);
        });

    });



var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log("Listening on " + port);
});