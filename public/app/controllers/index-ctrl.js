

LIRCtrls.controller('IndexCtrl',  function ($scope, Listing) {

    $scope.reverse = false;
    $scope.predicate = 'listPrice';
    $scope.listings = [];

    $scope.hello ="HelloAngular";

    $scope.var = {};
    $scope.appendVar = {};
    $scope.transitTimeToCenter;
    $scope.var.roomMin;
    $scope.var.roomMax
    $scope.var.priceMin
    $scope.var.priceMax
    $scope.var.areaMin
    $scope.var.areaMax
    $scope.var.offset = 0;
    $scope.var.len = 100;
    $scope.isSearching = false;



    $scope.search = function(){
        $scope.isSearching = true;
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

        $scope.appendVar = JSON.parse(JSON.stringify($scope.var));

        Listing.get($scope.var,function(d){
            $scope.isSearching = false;
            console.log(d);
            console.log(d.payload);
            $scope.result = d;

            $scope.listings.push.apply($scope.listings, d.payload);
        }, function(){
            $scope.isSearching = false;
        });

    }

    $scope.appendSearch = function(){

        $scope.appendVar.offset = $scope.listings.length;
        $scope.isSearching = true;
        Listing.get($scope.appendVar,function(d){
            $scope.isSearching = false;
            console.log(d);
            console.log(d.payload);
            $scope.result = d;

            $scope.listings.push.apply($scope.listings, d.payload);
        }, function(){
            $scope.isSearching = false;
        });
    }
    $scope.disableAppendSearch = function(){

        if($scope.listings.length == 0){
            return true;
        }
        if($scope.listings.length == $scope.result.totalLenght){
            return true;
        }
        return false;
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
        return !(listing.listPrice == 0 || typeof listing.livingArea == 'undefined' || listing.livingArea == 0 || listing.rooms == 0 );
    }






});