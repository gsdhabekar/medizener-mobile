(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('patientAddPrescriptionCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','$ionicLoading', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, $ionicLoading) {

    $scope.hideButton = $rootScope.isActive;
  	
    var Id = $localStorage.User.id;
    var patientId = $state.params.userId;

    $scope.add = function(user){
      console.log(user)
    }

  	$scope.cancel = function(){
  		$state.go('patientInfo',{userId:$state.params.userId});
  	};
	}]);
})();