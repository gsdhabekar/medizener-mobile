(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewPatientDetailCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices', 'AppointmentServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices) {
    
    var Id = $localStorage.User.id;
    $scope.appointId = $state.params.appointId;
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'patient',field:'prefix,first_name,last_name,specification,phone_number,dob,email,blood_group,profile'},function(result){
      if(result.code==200){
        $scope.user = result.data;
        console.log("====result.data====")
        console.log(result.data)
      } else{

      }
    });

    var query = "(doctor_id="+Id+",patient_id="+$state.params.userId+",appointment_status.status=completed)";
    AppointmentServices.get().get({query: query, field:'appointment_date,patient_id,booked_status,appointment_status,status,medication'},function(result){
      if(result.code==200){
        console.log("result.data")
        console.log(result.data)
        $scope.appointData = result.data;
      } else{

      }
    })

    $scope.calculateAge = function(birthday) { // pass in player.dateOfBirth
      var ageDifMs = Date.now() - new Date(birthday);
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    $scope.editPatient = function(Id){
      $state.go('editAppointmentPatient',{userId:Id});
    }

    $scope.viewPerPatient = function(Id){
      $state.go('patientData',{userId:Id});
    }

    $scope.addPriscription = function(Id){
      $state.go('addPrescription',{userId:Id, appointId:$scope.appointId});
    }

	}]);
})();