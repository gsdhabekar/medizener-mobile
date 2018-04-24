(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewStaffCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, $mdDialog) {
    

    var Id = $localStorage.User.id;
    var query = '(user_id='+Id+',type=staff,is_deleted=false)';
    UserServices.get().get({query:query,field:'first_name,last_name,phone_number,specification,profile'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.users = result.data;
      } else{

      }
    })

    $scope.editStaff = function(Id){
      console.log(Id)
      $state.go('editStaff',{userId:Id});
    }

    $scope.individualViewStaff = function(Id){
      console.log(Id)
      $state.go('individualViewStaff',{userId:Id});
    }

    $scope.removeStaff = function(Id, ev){
      UserServices.remove().delete({id:Id},function(result){
        if(result.code==200){
          $scope.users = $scope.users.filter(function(urs) { 
            return urs._id !== Id;  
          });
          console.log(result.message);
          $state.go('app');
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
            .title('Error!')
            .content(result.message)
            .ok('Error')
            .targetEvent(originatorEv)
          );
        }
      })
    }

    $scope.add = function(){
      $state.go('addStaff');
    }
	}]);
})();