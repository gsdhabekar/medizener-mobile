(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('roomPatientBookedCtrl', ['$scope','$mdSidenav','$state','$rootScope','RoomServices','UserServices','$localStorage','$mdDialog','AppointmentServices', function ($scope, $mdSidenav, $state, $rootScope, RoomServices, UserServices, $localStorage, $mdDialog, AppointmentServices) {

    var Id = $localStorage.User.id;
    $scope.user = [];
    $scope.user._id = $state.params.userId;
    var query = '(user_id='+Id+',is_deleted=false)';
    UserServices.getInfo().get({id:Id,field:'first_name,last_name'},function(result){
      if(result.code==200){
        $scope.users = result.data;
        console.log("result.data")
        console.log(result.data)
      } else{

      }
    });

    AppointmentServices.getInfo().get({id:$state.params.appointId,field:'bed_history'},function(result){
      if(result.code==200){
        $scope.appointBedHistory = result.data;
        if($scope.appointBedHistory.bed_history){
          $scope.appointBedHistory.bed_history.visits = result.data&&result.data.bed_history&&result.data.bed_history.visits?result.data.bed_history.visits:[];
        }
      } else{

      }
    });

    RoomServices.getInfo().get({id:$state.params.roomId,field:'name,room_no,doctor_id,room_type,fees,other_facility,no_of_bed,beds'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.room = result.data;
        var statusValue = result.data.beds.filter(function (beds) {
          return beds._id === $state.params.bedId;}).pop();
        console.log("statusValue")
        console.log(statusValue)
        $scope.bedValue = statusValue;
        if(!statusValue.status){
          $scope.btn = "Remove";
        } else{
          $scope.btn = "Submit";
        }
      } else{

      }
    });

    $scope.roomType = [
      {type:"AC",room_type:'AC'},
      {type:"Non-AC",room_type:'NON_AC'},
      {type:"General Ward",room_type:'GW'},
      {type:"ICU",room_type:'ICU'},
      {type:"Others",room_type:'OTHERS'}
    ];
    var value = { date: new Date(), val: "amit testing", v : "ddds"}
    $scope.submit = function(user,btnStatus,ev){
      if(btnStatus=="Submit"){
        var data = {
          'beds.$.patient_id'   : user._id,
          'beds.$.status'       : false,
          'beds.$.admitted_date': Number(new Date())
        }
        var appData = { bed_history:{
                          "bed_no": $scope.bedValue.bed_no,
                          "bed_id": $state.params.bedId,
                          "no_of_bed": $scope.room.no_of_bed,
                          "patient_id": $state.params.userId,
                          "status": false,
                          "progress": "pending",
                          "admitted_date": new Date(),
                          "room_type": $scope.room.room_type,
                          "sub_type": $scope.room.sub_type,
                          "name": $scope.room.name,
                          "room_no": $scope.room.room_no,
                          "other_facility": $scope.room.other_facility
                        }
                      }
      } else if(btnStatus=="visits"){
        $scope.appointBedHistory.bed_history.visits.push($scope.visitsAdd);
        
        var data = {
          'beds.$.patient_id'   : user._id,
          'beds.$.status'       : false,
          'beds.$.admitted_date': Number(new Date())
        }
        var appData = { bed_history:{
                          "bed_no": $scope.bedValue.bed_no,
                          "bed_id": $state.params.bedId,
                          "no_of_bed": $scope.room.no_of_bed,
                          "patient_id": $state.params.userId,
                          "status": false,
                          "progress": "pending",
                          "admitted_date": new Date(),
                          "room_type": $scope.room.room_type,
                          "sub_type": $scope.room.sub_type,
                          "name": $scope.room.name,
                          "room_no": $scope.room.room_no,
                          "other_facility": $scope.room.other_facility,
                          "visits": $scope.appointBedHistory.bed_history.visits
                        }
                      }
      } else {  
        var data = {
          'beds.$.patient_id' : null,
          'beds.$.status'     : true,
          "beds.$.admitted_date": 0
        }
        var appData = { bed_history: {
                          "bed_no": $scope.bedValue.bed_no,
                          "bed_id": $state.params.bedId,
                          "no_of_bed": $scope.room.no_of_bed,
                          "patient_id": $state.params.userId,
                          "admitted_date": $scope.bedValue.admitted_date,
                          "status": true,
                          "progress": "completed",
                          "discharged_date": new Date(),
                          "fees": $scope.room.price,
                          "room_type": $scope.room.room_type,
                          "sub_type": $scope.room.sub_type,
                          "name": $scope.room.name,
                          "room_no": $scope.room.room_no,
                          "other_facility": $scope.room.other_facility
                        }
                      }
      }
      console.log("=====appData======");
      console.log(appData)
      var query = '(beds._id='+$state.params.bedId+')';
      RoomServices.update().update({id:$state.params.roomId,query:query},data,function(result){
        if(result.code==200){
          AppointmentServices.update().update({id:$state.params.appointId, action:'all'},appData,function(results){
            if(results.code==200){
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
            }
          });

          $state.go('viewRoomStatus',{userId:"581e1ce3a9f3be7e307a8e6e"});
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
        }
      })
    }

    $scope.addVisit = function(user, medicineData, symptoms, doctor, ev){
      $scope.visitsAdd = { symptoms: symptoms,
                    medicineData: medicineData,
                    created_date: new Date(),
                    modified_date: new Date(),
                    doctor: doctor
                  };
      $scope.submit(user,'visits',ev);
    };

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
    $scope.addMedicine = function(record, ev){
      console.log(record);
      if(record.name&&record.doses&&record.daily&&record.meals){
        record.type = 'medicine';
        $scope.medicineData.push(record);
        $scope.sym = {};
      } else{
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Error!')
            .textContent("Please enter required field!")
            .ariaLabel('Error message!')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }
    }

    $scope.addRoom = function(){
      $state.go('addRoom');
    }

    $scope.editRoom = function(Id){
      $state.go('editRoom',{roomId:Id});
    }

    $scope.cancel = function(){
      $state.go('viewRoomStatus',{userId:Id});
    }

	}]);
})();