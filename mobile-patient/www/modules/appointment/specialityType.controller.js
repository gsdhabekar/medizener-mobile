(function(){
	'use strict';
	var app = angular.module('main.controller', []);
	// Main app controller
	app.controller('specialityTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, ComponentsServices) {
        $scope.hideButton = $rootScope.isActive;
        var query = '(type=specification,is_deleted=false,status=true)';
        ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
          if(result.code==200){
            $scope.category = result.data;
          } else{
            $scope.category = [];
          }
        });
    	// Go to doctorList
    	$scope.doctorList = function(specialityId){
    		$state.go('doctorList',{specialityId: specialityId});
    	};
        // redirect to specific page of application
        $scope.redirectPage = function(url){
            $state.go(url);
            $mdSidenav('left').close();               
        };
        // Book Appointment Redirect
        $scope.bookAppointment = function(){
            $state.go('appointmentList');
        }
        // Add Appointment
        $scope.addAppointment = function(){
            $state.go('dashboardPatientAppointment');
        }
        // Staff Information
        $scope.staffInfo = function(){
            $state.go('viewStaff');
        }
        // patient room
        $scope.admitPatient = function(){
            $state.go('viewRoom');
        }
	}]);
})();