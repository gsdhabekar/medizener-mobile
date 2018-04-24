(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('MainCtrl', ['$scope','$mdSidenav','$state','$rootScope', function ($scope, $mdSidenav, $state, $rootScope) {

        $scope.hideButton = $rootScope.isActive;

        var imagePath = 'assets/images/60.jpeg';
        $scope.imagePath = 'assets/images/background.jpg';

        $scope.messages2 = [
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          }
        ];
    	// Go to intro
    	$scope.gotoIntro = function(){
    		$state.go('intro');
    	};

        // redirect to specific page of application
        $scope.redirectPage = function(url){
            $state.go(url);
            $mdSidenav('left').close();               
        };
        // Book Appointment Redirect
        $scope.bookAppointment = function(){
            $state.go('specialityType');
        }
        // Add Appointment
        $scope.viewAppointDetails = function(){
            $state.go('dashboardPatientAppointment');
        }
        // Staff Information
        $scope.historyInfo = function(){
            $state.go('historySchedule');
        }
        // patient room
        $scope.admitPatient = function(){
            $state.go('viewRoom');
        }
        $scope.emergencyNo = function(){
            $state.go('emergencyNo');
        }
	}]);
})();