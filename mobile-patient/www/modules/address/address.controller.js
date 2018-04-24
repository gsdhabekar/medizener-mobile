(function(){
	'use strict';
	var app = angular.module('address.controller', []);
	// Address controller
	app.controller('AddressCtrl', ['$scope','$state','Location','GeoLocation','$mdDialog', 
        function ($scope, $state, Location, GeoLocation, $mdDialog) {
        $scope.user      = null;
        $scope.cities    = [];
        $scope.locations = [];
        // load all cities
        $scope.loadCities = function() {
            Location.location().get(function(res){
                if(res.code !== 401){
                    $scope.cities = res.data;
                    $scope.locations = [];
                }else{
                    $scope.cities = [];
                    $scope.locations = [];
                }
            });
        };
        // load all locations
        $scope.loadLocations = function(city) {
            var params = {'city':city};
            Location.location().get(params, function(res){
                if(res.code !== 401){
                    $scope.locations = res.data; 
                }else{
                    $scope.locations = [];
                }
            });
        };
        // Get your location by GPS
        $scope.getLocation = function(){
            GeoLocation.getAddress(function(err, location){
                if(err){
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Sorry!!!')
                        .textContent(err)
                        .ariaLabel('Alert')
                        .ok('Got it!')
                    );
                }else{
                    $state.go('app.home', {'location': location});
                }
            });
        };
        // show restaurants based on locations
        $scope.showRestaurants = function(user){
            $state.go('app.home', {'location': user.location});
        };
	}]);
})();