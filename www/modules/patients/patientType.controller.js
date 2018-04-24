(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('patientTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','$ionicLoading', function ($scope, $mdSidenav, $state, $rootScope, $ionicLoading) {

    $scope.hideButton = $rootScope.isActive;
  	
    // Go to intro
  	$scope.patientType = function(type){
      console.log(type)
  		$state.go('appointmentList',{patientType:type});
  	};

    $scope.addPrescription = function(){
      $state.go('patientAddPrescription',{userId:$state.params.userId})
    }
	}]);
})();