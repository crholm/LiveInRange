LIRRestApi.factory('Listing', ['$resource', function($resource) {
    return  $resource(
        "/api/listing"
    );
}]);
