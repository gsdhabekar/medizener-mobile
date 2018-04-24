(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('addRoomCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','RoomServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, UserServices, RoomServices, $localStorage, $mdDialog) {

    var Id = $localStorage.User.id;

    $scope.roomType = [
      {type:"AC",room_type:'AC'},
      {type:"Non-AC",room_type:'NON_AC'},
      {type:"General Ward",room_type:'GW'},
      {type:"ICU",room_type:'ICU'},
      {type:"Others",room_type:'OTHERS'}
    ];

    $scope.add = function(room, ev){

      var data = {
        room_type: room.room_type,
        subtype: room.room_type,
        name: room.name,
        doctor_id: Id,
        room_no: room.room_no,
        available_status: true,
        no_of_bed: parseInt(room.no_of_bed),
        fees: parseInt(room.fees),
        other_facility: room.other_facility
      };
      console.log(data);
      RoomServices.savePost().save(data,function(result){
        if(result.code==200){
          console.log(result.data);
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Success!')
              .textContent(result.message)
              .ariaLabel('Successfully added!')
              .ok('Got it!')
              .targetEvent(ev)
          );
          $state.go('viewRoom');
        } else{
          console.log("error")
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Error!')
              .textContent(result.message)
              .ariaLabel('Alert Dialog Demo')
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