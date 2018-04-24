(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('dashboardPatientAppointmentCtrl', ['$scope','$mdSidenav','$state','$rootScope', function ($scope, $mdSidenav, $state, $rootScope) {

    $scope.hideButton = $rootScope.isActive;
  	
    $scope.appointment = function(){
      $state.go('viewAppointDetails');
    };
    $scope.historyInfo = function(){
        $state.go('historySchedule');
    }

	}]);
})();