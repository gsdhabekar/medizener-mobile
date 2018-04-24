(function(){
	'use strict';

	var app = angular.module('home.controller', []);

	// Home controller
	app.controller('HomeCtrl', ['$scope','$stateParams','Home', function ($scope, $stateParams, Home) {
        $scope.location = $stateParams.location;
        // get all restaurants of particular location
        $scope.getRestaurants = function(){
            Home.restaurants($stateParams).get(function(res){
                if(res.code !== 401){
                    $scope.restaurants = res.data;
                }else{
                    $scope.restaurants = [];
                }
            });
        }();
	}]);
})();