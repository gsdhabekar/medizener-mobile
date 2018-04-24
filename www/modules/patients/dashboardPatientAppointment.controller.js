(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('dashboardPatientAppointmentCtrl', ['$scope','$mdSidenav','$state','$rootScope', function ($scope, $mdSidenav, $state, $rootScope) {

    $scope.hideButton = $rootScope.isActive;
  	
    $scope.appointment = function(){
      $state.go('addAppPatient');
    };

  	$scope.addPatient = function(){
  		$state.go('addAppointmentPatient');
  	};

    $scope.viewPatient = function(){
      $state.go('viewAppointmentPatient');
    };

    $scope.cancelAppointment = function(){
      $state.go('appointmentCancel');
    };

    $scope.historyPatient = function(){
      $state.go('historyPatient');
    }
    
	}]);
})();