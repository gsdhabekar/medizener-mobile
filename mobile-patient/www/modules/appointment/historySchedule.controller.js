(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('historyScheduleCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage', 'AppointmentServices', 'ComponentsServices', '$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, AppointmentServices, ComponentsServices, $mdDialog) {

        $scope.hideButton = $rootScope.isActive;
        
        var Id = $localStorage.User.id;
        var specialtyId = $state.params.specialityId;
        var query = '(patient_id='+Id+',is_deleted=false,booked_status=true,appointment_status.status=completed)';
        AppointmentServices.get().get({query:query,field:'appointment_date,medication,patient_id,doctor_id,fees'},function(result){
          if(result.code==200){
            if(result.data && result.data.length){
                $scope.users = result.data;
            } else{
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Warning')
                    .textContent("No record found!")
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    // .targetEvent(ev)
                );
                $state.go('dashboardPatientAppointment');
            }
          } else{
            $scope.users = [];
          }
        });

        $scope.calculateAge = function(birthday) { // pass in player.dateOfBirth
          var ageDifMs = Date.now() - new Date(birthday);
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        
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