var orderManagement = angular.module("orderManagement", []);

orderManagement.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    var url = "http://localhost:4000";

    app.saveOrder = function (newOrder) {
        //create a new order object
        var newOrder = {
            "name": $scope.name,
            "description": $scope.description,
            "price": $scope.price,
            "qty": $scope.qty};
        console.log($scope.name);

        console.log("order : " + JSON.stringify(newOrder));


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