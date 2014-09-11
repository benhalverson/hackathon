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
        $http.post(url + "/add", newListing).success(function () {
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

        $("#success-alert").alert();
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").alert('close');
        });

    };

    app.error = function (error) {
        $("#error-message").empty();
        $("#error-message").append(error);
        $("#error-alert").alert();
        $("#error-alert").fadeTo(2000, 500).slideUp(500, function(){
            //$("#error-alert").alert('close');
        });
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
            var error = 'Name Required';
            app.error(error);
            return;
        }
        if(!description){
            var error = 'Description Required';
            app.error(error);
            return;
        }
        if(!city){
            var error = 'City Required';
            app.error(error);
            return;
        }
        if(!state){
            var error = 'State Required';
            app.error(error);
            return;
        }
        if(!zipcode){
            var error = 'Zip Code Required';
            app.error(error);
            return;
        }
        if(!logoURL){
            var error = 'Logo URL Required';
            app.error(error);
            return;
        }
        if(!website){
            var error = 'Website Required';
            app.error(error);
            return;
        }
        if(!date){
            var error = 'Date Required';
            app.error(error);
            return;
        }
        if(!type){
            var error = 'Type Required';
            app.error(error);
            return;
        }
        if(!api){
            var error = '# of API\'s Required';
            app.error(error);
            return;
        }
        if(!prize){
            var error = 'Prize Required';
            app.error(error);
            return;
        }
        if(!price){
            var error = 'Price Required';
            app.error(error);
            return;
        }
        if(!duration){
            var error = 'Duration Required';
            app.error(error);
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