var orderManagement = angular.module("orderManagement", []);

orderManagement.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    //var url = "localhost:27017"; // for testing on local machine

    // url is where you host your server code
    var url = "http://shrouded-stream-1514.herokuapp.com";


    app.saveOrder = function (newOrder) {
        //create a new order object
        var newOrder = {
            "name": $scope.name,
            "description": $scope.description,
            "address": $scope.address,
            "city": $scope.city,
            "state": $scope.state,
            "zipcode": $scope.zipcode};
        console.log($scope.name);

        console.log("order : " + JSON.stringify(newOrder));

        //TODO: reset fields after adding something to the database
        $http.post(url + "/add", {name:newOrder}).success(function () {
            loadOrder();
        })
    };
    function loadOrder() {
        $http.get(url).success(function (order) {
            $scope.order = order;
        })
    }
    loadOrder();


});