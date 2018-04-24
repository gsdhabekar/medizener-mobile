(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('viewAppointDetailsCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog) {

        var Id = $localStorage.User.id;
        $scope.completedSwitch = 'compSwitch';
        var query = '(patient_id='+Id+')';
        AppointmentServices.get().get({query:query,sort:'(appointment_date=desc)'},function(result){
          if(result.code==200){
            $scope.users = result.data;
          } else{

          }
        });

        $scope.currentDate = new Date();
        $scope.currentDate = parseInt(Number($scope.currentDate)/1000);
        $scope.statusChange = function(appointId, status, appointDate, ev){
          if($scope.currentDate >= appointDate){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Warning')
                .textContent("You can't changed the previous date status!")
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
          } else{
            if(status=="cancelled"){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Warning')
                  .textContent('Your appointment already cancelled. Reschedule your appointment go to appointment section.')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(ev)
              );
            } else{
              var data = {status: false, booked_status: false};
              AppointmentServices.update().update({id:appointId,query:'(type=appointment)',action:'cancelled'},data,function(result){
                if(result.code==200){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Success')
                      .textContent('Status updated successfully.')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Got it!')
                      .targetEvent(ev)
                  );
                  $state.go('app');
                } else{
                    console.log("error");
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Status error')
                      .textContent(result.message)
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Got it!')
                      .targetEvent(ev)
                  );
                }
              })
            }
          }
        }

	}]);
})();