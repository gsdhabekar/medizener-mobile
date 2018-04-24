(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewRoomStatusCtrl', ['$scope','$mdSidenav','$state','$rootScope','RoomServices','$localStorage','$mdDialog', 'AppointmentServices', function ($scope, $mdSidenav, $state, $rootScope, RoomServices, $localStorage, $mdDialog, AppointmentServices) {

    var Id = $localStorage.User.id;

    var query = '(doctor_id='+Id+',is_deleted=false)';
    RoomServices.get().get({query:query,field:'name,room_no,doctor_id,room_type,fees,other_facility,no_of_bed,beds'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.rooms = result.data;
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

    $scope.getNumber = function(num) {
      return new Array(num);   
    }

    $scope.book = function(Id,status,bedId,ev){
      console.log(Id);
      if(!status){
        $mdDialog.show(
          $mdDialog.alert()
            .title('Alert!')
            .content('Bed already booked.')
            .ok('Ok')
            .targetEvent(ev)
        );

        var query = '(bed_history.bed_id='+bedId+',bed_history.progress=pending)';
        AppointmentServices.get().get({query:query,field:'bed_history,patient_id'},function(result){
          if(result.code==200){
            console.log("result.data");
            console.log(result.data);
            $scope.users = result.data;
            $state.go('roomPatientBooked',{roomId: Id, bedId: bedId, userId: result.data[0].patient_id._id, appointId: result.data[0]._id});
          } else{
          }
        });
      } else{
        $state.go('appointmentSuccess',{roomId: Id, bedId: bedId, flag: 'false'});
        // $state.go('roomPatientBooked',{roomId: Id,bedId: bedId, userId: $state.params.userId });
      }
    }

    $scope.addRoom = function(){
      $state.go('addRoom');
    }

    $scope.editRoom = function(Id){
      $state.go('editRoom',{roomId:Id});
    }


	}]);
})();