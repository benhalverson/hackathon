var express = require("express")
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '../public'));

//function handleCors(req, res, callback) {
//
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
//    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
//
//    // CORS OPTIONS request, simply return 200
//    if (req.method == 'OPTIONS') {
//        res.statusCode = 200;
//        res.end();
//        callback.onOptions();
//        return;
//    }
//
//    callback.onContinue();


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'hackathon.pro');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});


////mongoose.connect("mongodb://localhost/orders");


var mongoose = require("mongoose");
var uriUtil = require("mongodb-uri");
// mongodb options
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };


var mongodbUri = "mongodb://admin:admin123@ds053419.mongolab.com:53419/heroku_app28010960";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function() {
    console.log("connected to the server!")

});

// creating a model for mongodb
var Order = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    qty: Number
});


//query the database
app.get("/", function(req, res){
    Order.find(function(err, order) {
        console.log("order from server " + order);
        res.send(order);
    })


//posting to mongo database
app.post("/add", function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var qty = req.body.qty;
    console.log("name in post " +name.name);
    console.log("body content = " + JSON.stringify(req.body));
    var order = new Order(
        {   name: name.name,
            description: name.description,
            price: name.price,
            qty: name.qty
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
            price: price,
            qty: qty});
    order.save(function (err) {
        res.send();
    })
});
});
var port = Number(process.env.PORT || 6666);
app.listen(port, function() {
    console.log("Listening on " + port);
});

//app.listen(4000);