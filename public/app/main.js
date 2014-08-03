var orderManagement = angular.module("orderManagement", []);

orderManagement.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    //var url = "localhost:20017"; // for testing on local machine

    // url is where your you host yoru server code
    var url = "http://shrouded-stream-1514.herokuapp.com";


    app.saveOrder = function (newOrder) {
        //create a new order object
        var newOrder = {
            "name": $scope.name,
            "description": $scope.description,
            "price": $scope.price,
            "qty": $scope.qty};
        console.log($scope.name);

        console.log("order : " + JSON.stringify(newOrder));

        //TODO: reset fields after adding something to the database
        //code doesn't work right
//        var newOrder = {
//            "name": $scope.name = "",
//            "description": $scope.description = "",
//            "price": $scope.price = 0,
//            "qty": $scope.qty = 0
//        };
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