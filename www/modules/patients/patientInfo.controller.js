(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('patientInfoCtrl', ['$scope','$mdSidenav','$state','$rootScope','$ionicLoading', function ($scope, $mdSidenav, $state, $rootScope, $ionicLoading) {

    $scope.hideButton = $rootScope.isActive;
  	
    // Go to intro
  	$scope.patientData = function(){
  		$state.go('patientData',{userId:$state.params.userId});
  	};

    $scope.addPrescription = function(){
      $state.go('patientAddPrescription',{userId:$state.params.userId})
    }
	}]);
})();