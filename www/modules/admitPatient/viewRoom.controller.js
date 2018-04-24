(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewRoomCtrl', ['$scope','$mdSidenav','$state','$rootScope','RoomServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, RoomServices, $localStorage, $mdDialog) {

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
      {type:"AC Room",_id:1},
      {type:"Non-AC Room",_id:2},
      {type:"General Ward",_id:3},
      {type:"Others",_id:4}
    ];

    $scope.addRoom = function(){
      $state.go('addRoom');
    }

    $scope.editRoom = function(Id){
      $state.go('editRoom',{roomId:Id});
    }

    $scope.viewStatus = function(){
      $state.go('viewRoomStatus',{userId:Id});
    }

    $scope.removeRoom = function(Id, ev){
      RoomServices.remove().delete({id:Id},function(result){
        if(result.code==200){
          $scope.rooms = $scope.rooms.filter(function(room) { 
            return room._id !== Id;  
          });
          console.log(result.message);
          $state.go('app');
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Ok')
              .targetEvent(ev)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
            .title('Error!')
            .content(result.message)
            .ok('Error')
            .targetEvent(ev)
          );
        }
      })
    }

	}]);
})();