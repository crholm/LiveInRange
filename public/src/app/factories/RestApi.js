angular.module('LIR.factories.RestApi').factory('Listing', function ($resource) {
    return $resource(
        "/api/listing"
    );
});