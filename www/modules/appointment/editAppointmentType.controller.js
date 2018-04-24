(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('editAppointmentTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog) {

    var Id = $localStorage.User.id;

    // UserServices.getInfo().get({id:Id,access_id:$state.params.roomId,access_type:'room',field:'type,room_no,no_of_bed,price,other_facility'},function(result){
    //   if(result.code==200){
    //     console.log(result.data)
          $scope.room = {
            type: 3,
            room_no: 103,
            no_of_bed: 1,
            price: 1200,
            other_facility: 'Other facility'
          };
    //   } else{

    //   }
    // })

    $scope.roomType = [
      {type:"AC Room",_id:1},
      {type:"Non-AC Room",_id:2},
      {type:"General Ward",_id:3},
      {type:"Others",_id:4}
    ];

    $scope.update = function(room, ev){
      var data = {
        type: room.type,
        room_no: room.room_no,
        no_of_bed: room.no_of_bed,
        price: room.price,
        other_facility: room.other_facility
      };

      // UserServices.update().update({id:Id,action:'all',access_id:room._id,access_type:'room'},data,function(result){
      //   if(result.code==200){
      //     console.log(result.data);
          $state.go('viewRoom');
      //     $mdDialog.show(
      //       $mdDialog.alert()
      //         .parent(angular.element(document.querySelector('#popupContainer')))
      //         .clickOutsideToClose(true)
      //         .title('Success!')
      //         .textContent(result.message)
      //         .ariaLabel('Successfully updated!')
      //         .ok('Got it!')
      //         .targetEvent(ev)
      //     );
      //   } else{
      //     console.log("error")
      //     $mdDialog.show(
      //       $mdDialog.alert()
      //         .parent(angular.element(document.querySelector('#popupContainer')))
      //         .clickOutsideToClose(true)
      //         .title('Error!')
      //         .textContent(result.message)
      //         .ariaLabel('Error message!')
      //         .ok('Got it!')
      //         .targetEvent(ev)
      //     );
      //   }
      // })
    }

    $scope.cancel = function(){
      $state.go('viewRoom');
    };
	}]);
})();