var hackathonsite = angular.module("hackathonsite", []);

hackathonsite.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    //var url = "mongodb://localhost:27017/hackathon"; // for testing on local machine

    // url is where you host your server code
    var url = "http://shrouded-stream-1514.herokuapp.com";
      //var url = "http://pure-citadel-9795.herokuapp.com";

    app.saveListing = function (newlisting) {
        //create a new order object
        var newListing = {
            "name": $scope.name,
            "description": $scope.description,
            "address": $scope.address,
            "city": $scope.city,
            "state": $scope.state,
            "zipcode": $scope.zipcode,
            "logoURL": $scope.logoURL,
            "website": $scope.website,
            "date": $scope.date,
            "type": $scope.type,
            "api": $scope.api,
            "prize": $scope.prize,
            "price": $scope.price,
            "duration": $scope.duration
        };
        console.log($scope.newListing);

        console.log("new listing : " + JSON.stringify(newListing));

        //TODO: reset fields after adding something to the database
        $http.post(url + "/add", {name:newListing}).success(function () {
            console.log("posting");
            loadOrder();
        })
    };

    app.removeItem = function (itemName) {
        $http.post(url + "/remove/"+itemName).success(function () {
            console.log("removing listing");
            loadOrder();
        })
    };

    function loadOrder() {
        $http.get(url).success(function (listing) {
            $scope.listing = listing;
            console.log("loading");
        })
    }
    loadOrder();


});