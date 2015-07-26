'use strict';

// Declare app level module which depends on views, and components
angular.module('HotSpot', [
  'ngRoute',
  'HotSpot.view'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index.html'});
}])
.controller('appCtrl', ['$http','$scope', function($http, $scope) {
  $scope.somevalue = 5;
}]);