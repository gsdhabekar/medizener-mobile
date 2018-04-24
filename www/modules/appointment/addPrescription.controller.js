(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('addPrescriptionCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices', 'AppointmentServices','$mdDialog','$location', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog, $location) {
    
    var Id = $localStorage.User.id;
    $scope.appointId = $state.params.appointId;
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    // UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'patient',field:'prefix,first_name,last_name,specification,phone_number,dob,email,gender,blood_group,address'},function(result){
    //   if(result.code==200){
    //     // $ionicLoading.hide();
    //     console.log(result.data)
    //     $scope.user = result.data;
    //     $scope.user.address1 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address1;
    //     $scope.user.address2 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address2;
    //     $scope.user.city = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].city;
    //     $scope.user.state = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].state;
    //     $scope.user.pincode = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].postal_code;
    //   } else{

    //   }
    // });

    AppointmentServices.getInfo().get({id:$scope.appointId,field:'appointment_date,patient_id,booked_status,appointment_status,status,symptones,medication,follow_up_after,fees'},function(result){
      if(result.code==200){
        console.log("result.data")
        console.log(result.data)
        $scope.user = result.data;
        $scope.user.follow_up_after = result.data.follow_up_after?result.data.follow_up_after:7;
        $scope.extraMoney = 0;
        $scope.symptoms = result.data.symptones;
        $scope.medicineData = result.data.medication;
      } else{

      }
    })

    $scope.appointmentDate = new Date();

    $scope.calculateAge = function(birthday) { // pass in player.dateOfBirth
      var ageDifMs = Date.now() - new Date(birthday);
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    $scope.speech = function(){
      console.log("Called");
    }

    $scope.viewPerPatient = function(Id){
      $state.go('patientData',{userId:Id});
    }

    $scope.recognizedText = '';
    $scope.sym = {};
    $scope.record = function(res) {
      var recognition = new SpeechRecognition();
      $scope.interim = [];
      $scope.final = '';
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = true;

      recognition.onresult = function(event) {
        if (event.results.length > 0) {
          $scope.recognizedText = event.results[0][0].transcript;
          if(res=='symptoms') {
            $scope.symptoms = $scope.recognizedText;
          } else if(res=='name'){
            $scope.sym.name = $scope.recognizedText;
          } else if(res=='daily'){
            $scope.sym.daily = $scope.recognizedText;
          } else if(res=='doses'){
            $scope.sym.doses = $scope.recognizedText;
          } else if(res=='meals'){
            $scope.sym.meals = $scope.recognizedText;
          } else{
            $scope.meals = $scope.recognizedText;
          }
          $scope.$apply();
        }
      };
      recognition.start();
    };

    $scope.medicineData = [];
    $scope.addMedicine = function(record){
      console.log(record);
      record.type = 'medicine';
      $scope.medicineData.push(record);
      $scope.sym = {};
    }

    $scope.addPriscription = function(record, medicineData, symptoms, action, extraMoney, ev){
      console.log(record);
      var fees = parseInt(record.fees)+parseInt(extraMoney);
      var data = { 'symptones': symptoms,
        follow_up_after: record.follow_up_after,
        medication: medicineData,
        fees: fees,
        status: true
      };
      AppointmentServices.update().update({id:$scope.appointId,action:'completed'},data,function(result){
        if(result.code==200){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Success!')
                .textContent(result.message)
                .ariaLabel('Successfully updated!')
                .ok('Got it!')
                .targetEvent(ev)
              );
            if(action=='submit'){
              $location.path('app');
            } else{
              $state.go('viewRoom');
            }
          } else{
            console.log("error")
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error!')
                .textContent(result.message)
                .ariaLabel('Error message!')
                .ok('Got it!')
                .targetEvent(ev)
            );
            console.log("error");
        }
      })
    };


	}]);
})();