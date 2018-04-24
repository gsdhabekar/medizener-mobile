(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('appointmentCancelCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog) {

        var Id = $localStorage.User.id;
        // var query = '(user_id='+Id+',type=patient)';
        // UserServices.get().get({query:query,field:'first_name,last_name,specification'},function(result){
        //   if(result.code==200){
        //     console.log(result.data)
        //     $scope.users = result.data;
        //   } else{

        //   }
        // });

        $scope.patientsInfo = function(Id, appointId){
            $state.go('patientData',{userId:Id,appointId:appointId});             
        };
        
        $scope.current = function(date){
          console.log("=======currentDate=====")
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
          console.log(startDate)
          console.log(endDate)
          var query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+')';//,appointment_status.status=scheduled,booked_status=true
          console.log(query)
          AppointmentServices.get().get({query:query,field:'appointment_date,patient_id,booked_status,appointment_status,status,type'},function(result){
            if(result.code==200){
              console.log(result.data);
              $scope.users = result.data;
            } else{
            }
          })
        }
        $scope.current();

        $scope.date = new Date();
        $scope.next = function(){
          $scope.date.setDate($scope.date.getDate() + 1)
          console.log($scope.date)
          $scope.current($scope.date);
        }
        $scope.previous = function(){
          $scope.date.setDate($scope.date.getDate() - 1)
          console.log($scope.date)
          $scope.current($scope.date);
        }

        $scope.currentDate = new Date();
        $scope.currentDate = parseInt(Number($scope.currentDate)/1000);
        $scope.statusChange = function(appointId, status, appointDate, usrs, ev){
          console.log(appointDate)
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
              AppointmentServices.update().update({id:appointId,query:'(type='+usrs.type+')',action:'cancelled'},data,function(result){
                if(result.code==200){
                    console.log(result.code);
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
                    console.log(result.message);
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