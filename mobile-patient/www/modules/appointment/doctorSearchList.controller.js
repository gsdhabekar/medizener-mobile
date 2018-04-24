(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('doctorSearchListCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage', 'SearchServices', 'ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, SearchServices, ComponentsServices) {

        $scope.hideButton = $rootScope.isActive;
        
        var Id = $localStorage.User.id;
        var keywords = $state.params.keywords;
        var query = 'search='+keywords;
        SearchServices.search({}).get({search:query},function(result){
          if(result.code==200){
            $scope.users = result.data;
          } else{
            $scope.users = result.data;
          }
        });

        var query = '(type=specification,is_deleted=false,status=true)';
        ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
          if(result.code==200){
            $scope.category = result.data;
          } else{
            $scope.category = [];
          }
        });
    	// Go to doctorList
    	$scope.doctorList = function(){
    		$state.go('doctorList');
    	};
        // redirect to specific page of application
        $scope.redirectPage = function(url){
            $state.go(url);
            $mdSidenav('left').close();               
        };
        // Book Appointment Redirect
        $scope.bookAppointment = function(userId){
            $state.go('bookAppointment',{userId: userId});
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