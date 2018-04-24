(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('editRoomCtrl', ['$scope','$mdSidenav','$state','$rootScope','RoomServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, RoomServices, $localStorage, $mdDialog) {

    var Id = $localStorage.User.id;

    RoomServices.getInfo().get({id:$state.params.roomId,field:'name,room_type,room_no,no_of_bed,fees,other_facility'},function(result){
      if(result.code==200){
        console.log("result.data")
        console.log(result.data)
        $scope.room = result.data;
      } else{

      }
    })

    $scope.roomType = [
      {type:"AC",room_type:'AC'},
      {type:"Non-AC",room_type:'NON_AC'},
      {type:"General Ward",room_type:'GW'},
      {type:"ICU",room_type:'ICU'},
      {type:"Others",room_type:'OTHERS'}
    ];

    $scope.update = function(room, ev){

      console.log(room)
      var data = {
        room_type: room.room_type,
        subtype: room.room_type,
        name: room.name,
        doctor_id: Id,
        room_no: room.room_no,
        // no_of_bed: parseInt(room.no_of_bed),
        fees: parseInt(room.fees),
        other_facility: room.other_facility
      };
      console.log(data)

      RoomServices.update().update({id:room._id},data,function(result){
        if(result.code==200){
          console.log(result.data);
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
      })
    }

    $scope.cancel = function(){
      $state.go('viewRoom');
    };
	}]);
})();