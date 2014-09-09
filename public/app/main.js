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
        console.log($scope.Listing);

        console.log("new listing : " + JSON.stringify(newListing));

        //TODO: reset fields after adding something to the database
        $http.post(url + "/add", {name:newListing}).success(function () {
            console.log("posting");
            
        })
    };

    app.refresh = function () {
        $('#name').val('');
        $('#description').val('');
        $('#city').val('');
        $('#state').val('');
        $('#zipcode').val('');
        $('#logoURL').val('');
        $('#website').val('');
        $('#date').val('');
        $('#type').val('');
        $('#api').val('');
        $('#price').val('');
        $('#prize').val('');
        $('#duration').val('');

    };

    $scope.check = function() {
        var name =  $('#name').val();
        var description =  $('#description').val();
        var city =  $('#city').val();
        var state =  $('#state').val();
        var zipcode =  $('#zipcode').val();
        var logoURL =  $('#logoURL').val();
        var website =  $('#website').val();
        var date =  $('#date').val();
        var type =  $('#type').val();
        var api =  $('#api').val();
        var price =  $('#price').val();
        var prize  =  $('#prize').val();
        var duration =  $('#duration').val();

        if(!name){
            alert('Name Required');
            return;
        }
        if(!description){
            alert('Description Required')
            return;
        }
        if(!city){
            alert('City Required')
            return;
        }
        if(!state){
            alert('State Required')
            return;
        }
        if(!zipcode){
            alert('Zipcode Required')
            return;
        }
        if(!logoURL){
            alert('Logo URL Required')
            return;
        }
        if(!website){
            alert('Website Required')
            return;
        }
        if(!date){
            alert('Date Required')
            return;
        }
        if(!type){
            alert('Type Required')
            return;
        }
        if(!api){
            alert('API Required')
            return;
        }
        if(!price){
            alert('Price Required')
            return;
        }
        if(!prize){
            alert('Prize Required')
            return;
        }
        if(!duration){
            alert('Duration Required')
            return;
        }
        
        app.saveListing();
        app.refresh();
        
    }

    app.removeItem = function () {
        $http.post(url + "/remove/:_id").success(function () {
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