var express = require("express")
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://benhalverson.me');


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(express.static(__dirname + '/public'));

var mongoose = require("mongoose");
mongoose.connect('mongodb://admintest:password123@kahana.mongohq.com:10008/app28010960');

// creating a model for mongodb
var Order = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    qty: Number
});

//saving data to mongo


app.get("/", function(req, res){
    Order.find(function(err, order) {
        console.log("order from server " + order);
        res.send(order);
    })
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



app.listen(process.env.PORT);
//app.listen(4000);
