(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('patientDataCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','$ionicLoading', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, $ionicLoading) {

    $scope.hideButton = $rootScope.isActive;
  	
    var Id = $localStorage.User.id;
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'patient',field:'prefix,first_name,last_name,phone_number,dob,email,gender,blood_group,address'},function(result){
      if(result.code==200){
        // $ionicLoading.hide();
        console.log(result.data)
        $scope.user = result.data;
        $scope.user.address1 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address1;
        $scope.user.address2 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address2;
        $scope.user.city = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].city;
        $scope.user.state = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].state;
        $scope.user.pincode = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].postal_code;
      } else{

      }
    });

    // Go to intro
  	$scope.patientData = function(){
  		$state.go('patientData',{userId:$state.params.userId});
  	};
	}]);
})();