(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('appointmentCancelCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog) {

        var Id = $localStorage.User.id;

        $scope.patientsInfo = function(Id, appointId){
            $state.go('patientData',{userId:Id,appointId:appointId});             
        };
        
        $scope.current = function(date){
          var currentDate = new Date();
          if(date){
            currentDate = new Date(date);
          }
          $scope.date = currentDate;
          var startDate = new Date(currentDate.setDate(currentDate.getDate()));
            startDate.setHours(0, 0, 0, 0);
            startDate = new Date(startDate).toISOString();
          var endDate = currentDate;
            endDate.setHours(23, 59, 59, 999);
            endDate = new Date(endDate).toISOString();
          $scope.displayDate = currentDate;
          var query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',type=appointment,booked_status=true)';
          AppointmentServices.get().get({query:query,field:'appointment_date,patient_id,booked_status,appointment_status,status'},function(result){
            if(result.code==200){
              $scope.users = result.data;
            } else{
            }
          })
        }
        $scope.current();

        $scope.date = new Date();
        $scope.next = function(){
          $scope.date.setDate($scope.date.getDate() + 1)
          $scope.current($scope.date);
        }
        $scope.previous = function(){
          var todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);
          var compareDate = $scope.date;
              compareDate.setHours(0, 0, 0, 0);
          if(todayDate<compareDate){
            $scope.date.setDate($scope.date.getDate() - 1)
            $scope.current($scope.date);
          }
        }
        $scope.statusChange = function(appointId, status, appointDate, ev){
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
            var data = {status: false};
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
                  // $state.go('app');
              } else{
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

	}]);
})();