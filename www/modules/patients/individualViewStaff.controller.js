(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('individualViewStaffCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, $mdDialog) {
    
    var Id = $localStorage.User.id;
    UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'staff',field:'prefix,first_name,last_name,phone_number,email,gender,blood_group,dob,address,fees,specification'},function(result){
      if(result.code==200){
        $scope.user = result.data;
        $scope.user.payment = result.data&&result.data.fees&&result.data.fees[0]&&result.data.fees[0].price;
        $scope.user.address1 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address1;
        $scope.user.address2 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address2;
        $scope.user.city = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].city;
        $scope.user.state = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].state;
        $scope.user.pincode = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].postal_code;
      } else{

      }
    });

    $scope.editStaff = function(Id){
      console.log(Id)
      $state.go('editStaff',{userId:Id});
    }

    $scope.add = function(){
      $state.go('addStaff');
    }
	}]);
})();