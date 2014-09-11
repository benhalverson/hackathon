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

        //console.log("name in post " +name.name);
        //console.log("body content = " + JSON.stringify(req.body));
        var listing = new Listing(
            {   
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
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
        var listing = Listing(
            {name: name,
                description: description,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                logoURL: logoURL,
                website: website,
                date: name.date,
                type: name.type,
                api: name.api,
                prize: name.prize,
                price: name.price,
                duration: name.duration
            });
        listing.save(function (err) {
            res.send();
        })
    });
});

//read a single listing by ID
app.put('/update/:id', function(req,res){
   return Listing.findById(req.params.id, function(err, listing){
       if(!err){
           return res.send(listing);
       }else{
           return console.log(err);
       }
   });
});

//update a single listing by ID
app.put('/update/:id', function(req, res){
   return Listing.findById(req.params.id, function(err, listing){
      listing.name = req.body.name;
      listing.description = req.body.description;
      //TODO: addmore later
   });
});

// remove listing
// app.post("/remove/:id", function (req, res) {
//     var id = req.route.params.id;
//     Listing.remove( {"_id": "5410f1aa5e605d0200d86b7d"} );
//     res.send();
// });

app.get('/remove/:id?', function(req, res){

    var id = req.route.params.id;
    res.send("HIT REMOVAL ENDPOINT");
});

// app.post('/reserve-appointment/:id?', function(req, res){
//     var student = req.body.student;
//     var appointmentID = req.route.params.id;

//     var appointment = mongoose.model('Appointment');
//     appointment.findByIdAndUpdate( req.route.params.id, {
//         "student": student,
//         }, function(err, result) {
//             if (err){ 
//                 console.log(err);
//                 console.log(result);
//                 res.send("We were unable to reserve that appointment for you.")
//             }
//         });
//     res.send("Appointment Reserved!");
// });


var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
    console.log("Listening on " + port);
});