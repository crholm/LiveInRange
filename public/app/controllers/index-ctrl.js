

LIRCtrls.controller('IndexCtrl',  function ($scope, Listing) {

    $scope.reverse = false;
    $scope.predicate = 'listPrice';
    $scope.listings = [];

    $scope.hello ="HelloAngular";

    $scope.var = {};
    $scope.transitTimeToCenter;
    $scope.var.roomMin;
    $scope.var.roomMax
    $scope.var.priceMin
    $scope.var.priceMax
    $scope.var.areaMin
    $scope.var.areaMax
    $scope.var.offset = 0;
    $scope.var.len = 100;




    $scope.search = function(){

        $scope.listings = [];

        if(typeof $scope.transitTimeToCenter != 'undefined'){
            $scope.var.transitTimeToCenter = $scope.transitTimeToCenter*60;
        }else if($scope.transitTimeToCenter == ""){
            delete $scope.var.transitTimeToCenter;
        }

        for(var key in $scope.var){
            console.log(key + " : " + $scope.var[key]);
            if($scope.var[key] == ""){
                delete $scope.var[key];
            }
        }

        Listing.get($scope.var,function(d){
            console.log(d);
            console.log(d.payload);

            $scope.listings.push.apply($scope.listings, d.payload);
        })

    }

    $scope.prettyNumbers = function(num){
        num = Math.round(num);

        var result = "";

        num = num.toString();

        while(num.length > 3){
            var last = num.length-1;
            result = num.substr(last-2, last) + " " + result;
            num = num.substr(0, last-2);

        }

        return num + " " + result

    }

    $scope.getCostPerM2 = function(listing){
        var p = listing.listPrice/listing.livingArea;
        if(typeof listing.costPerM2 == 'undefined'){
            listing.costPerM2 = p;
        }

        return $scope.prettyNumbers(p);

    }

    $scope.getImgUrl = function(listing){
        return "http://api.bcdn.se/cache/primary_" + listing.booliId + "_600x600.jpg";

    }

    $scope.getTransitTime = function(listing){

        return Math.round(listing.location.position.transitTimeToCenter/60);
    }


    $scope.sanityCheck = function(listing){
        if(!$scope.sanityCheckBool){
            return true;
        }
        if(listing.listPrice == 0){
            return false;
        }
        return true;

    }






});