(function(){
	'use strict';
	var app = angular.module('main.controller', []);
	// Main app controller
	app.controller('viewRoomStatusCtrl', ['$scope','$mdSidenav','$state','$rootScope','AppointmentServices','$localStorage','$mdDialog','ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, AppointmentServices, $localStorage, $mdDialog, ComponentsServices) {
    var Id = $localStorage.User.id;
    var query = '(type=specification,is_deleted=false,status=true)';
    ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
      if(result.code==200){
        $scope.category = result.data;
      } else{
        $scope.category = [];
      }
    });
    var query = '(patient_id='+Id+',is_deleted=false,bed_history.patient_id='+Id+')';
    AppointmentServices.get().get({query:query,field:'patient_id,doctor_id,fees,bed_history,appointment_date'},function(result){
      if(result.code==200){
        $scope.users = result.data;
      } else{

      }
    });
	}]);
})();