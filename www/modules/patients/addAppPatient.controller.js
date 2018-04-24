(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('addAppPatientCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices) {
    
    var Id = $localStorage.User.id;
    var query = '(user_id='+Id+',type=patient)';
    UserServices.get().get({query:query,field:'first_name,last_name,email,specification,profile'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.users = result.data;
      } else{

      }
    })

    $scope.bookAppointment = function(userId){
      $state.go('appointmentPatient',{userId:userId});
    }

    $scope.editPatient = function(Id){
      $state.go('editAppointmentPatient',{userId:Id});
    }

    $scope.viewPerPatient = function(Id){
      $state.go('patientData',{userId:Id});
    }

	}]);
})();