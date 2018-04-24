(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewAppointmentTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog) {

    var Id = $localStorage.User.id;

    $scope.roomType = [
      {type:"AC Room",_id:1},
      {type:"Non-AC Room",_id:2},
      {type:"General Ward",_id:3},
      {type:"Others",_id:4}
    ];

    $scope.data  = [
      {
        type: 1,
        room_no: 101,
        no_of_bed: 2,
        price: 1000,
        other_facility: 'Other facility'
      },
      {
        type: 2,
        room_no: 102,
        no_of_bed: 3,
        price: 800,
        other_facility: 'Other facility'
      },
      {
        type: 3,
        room_no: 103,
        no_of_bed: 1,
        price: 1200,
        other_facility: 'Other facility'
      },
      {
        type: 4,
        room_no: 104,
        no_of_bed: 4,
        price: 500,
        other_facility: 'Other facility'
      }];

    $scope.addRoom = function(){
      $state.go('addRoom');
    }

    $scope.editRoom = function(Id){
      $state.go('editRoom',{roomId:Id});
    }

    $scope.removeStaff = function(Id, ev){
      // UserServices.remove().delete({id:Id},function(result){
      //   if(result.code==200){
      //     $scope.users = $scope.users.filter(function(urs) { 
      //       return urs._id !== Id;  
      //     });
      //     console.log(result.message);
      //     $state.go('app');
      //     $mdDialog.show(
      //       $mdDialog.alert()
      //         .title('Success!')
      //         .content(result.message)
      //         .ok('Nice')
      //         .targetEvent(originatorEv)
      //     );
      //   }else{
      //     console.log(result.message);
      //     $mdDialog.show(
      //       $mdDialog.alert()
      //       .title('Error!')
      //       .content(result.message)
      //       .ok('Error')
      //       .targetEvent(originatorEv)
      //     );
      //   }
      // })
    }

	}]);
})();