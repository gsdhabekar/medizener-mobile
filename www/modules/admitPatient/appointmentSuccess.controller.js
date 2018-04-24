(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('appointmentSuccessCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog) {

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
          $state.go('roomPatientBooked',{roomId: $state.params.roomId, bedId: $state.params.bedId, userId: Id, appointId: appointId});
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
          var query = {};
          console.log($state.params.flag==='false')
          if($state.params.flag=='true'){
            query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',bed_history.bed_id='+$state.params.bedId+',booked_status=true,appointment_status.status=completed,status=true)';
          } else{
            query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',booked_status=true,appointment_status.status=completed,status=true)';
          }
          console.log(query)
          AppointmentServices.get().get({query:query,field:'appointment_date,patient_id,booked_status,appointment_status,status,fees,bed_history'},function(result){
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
          var todayDate = new Date();
              todayDate.setHours(0, 0, 0, 0);
          var compareDate = $scope.date;
              compareDate.setHours(0, 0, 0, 0);
          // if(todayDate<compareDate){
            $scope.date.setDate($scope.date.getDate() - 1)
            console.log($scope.date)
            $scope.current($scope.date);
          // }
        }

	}]);
})();