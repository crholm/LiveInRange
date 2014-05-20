'use strict';

//-------------------------------
// Main app
//-------------------------------

angular.module('LIR', [
  // NG
  'ui.router',
  'ngAnimate',

  // Libs
  'mgcrea.ngStrap', // angular-strap

  // Views
  'app/views/home.ngt',
  'app/views/search.ngt',

  // html2js templates
  'templates',

  // LIR
  'LIR.controllers', 
  'LIR.factories'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.ngt'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'app/views/search.ngt'
    });
});


//-------------------------------
// Modules
//-------------------------------

angular.module('LIR.controllers', ['LIR.factories.RestApi']);
angular.module('LIR.factories', []);

angular.module('LIR.factories.RestApi', ['ngResource']);