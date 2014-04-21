angular.module('LIR.controllers').controller('HomeCtrl', function ($scope, $location) {

  if (!Array.hasOwnProperty('getRandomItem')) {
    Array.prototype.getRandomItem = function() {
      return this[Math.floor(Math.random()*this.length)]
    }
  };

  $scope.popover = {
    rooms: {
      items: ['etta', 'tvåa', 'trea', 'fyra', 'femma'],
      unit: ''
    },
    area: {
      items: ['10', '20', '30', '40', '50', '60'],
      unit: 'kvadrat'
    },
    price: {
      items: ['1 000 000', '1 500 000', '2 000 000', '2 500 000', '3 000 000', '3 500 000'],
      unit: 'kr'
    },
    transitTime: {
      items: ['5', '10', '15', '20', '25', '30', '40'],
      unit: 'minuter'
    },
    transitStop: {
      items: ['T-Centralen', 'Hornstull', 'Gullmarsplan', 'St. Eriksplan', 'Tekniska Högskolan'],
      unit: ''
    }
  };

  $scope.query = {
    rooms: $scope.popover.rooms.items.getRandomItem(),
    area: $scope.popover.area.items.getRandomItem() + ' ' + $scope.popover.area.unit,
    price: $scope.popover.price.items.getRandomItem() + ' ' + $scope.popover.price.unit,
    transitTime: $scope.popover.transitTime.items.getRandomItem() + ' ' + $scope.popover.transitTime.unit,
    transitStop: $scope.popover.transitStop.items.getRandomItem() + ' ' + $scope.popover.transitStop.unit
  };

  $scope.search = function() {
    $location.path('/search');
  }
})