(function(){
  'use strict';

  var app = angular.module('main.controller', []);

  // Main app controller
  app.controller('historyPatientCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage', 'AppointmentServices', 'ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, AppointmentServices, ComponentsServices) {

        $scope.hideButton = $rootScope.isActive;
        
        var Id = $localStorage.User.id;
        

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
          // var query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',type=appointment,booked_status=true,appointment_status.status=scheduled)';
          // console.log(query)
          // AppointmentServices.get().get({query:query,field:'appointment_date,patient_id,booked_status,appointment_status,status,fees'},function(result){
          //   if(result.code==200){
          //     console.log(result.data);
          //     $scope.users = result.data;
          //   } else{
          //   }
          // })
          var query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',is_deleted=false,booked_status=true,appointment_status.status=completed)';
          AppointmentServices.get().get({query:query,field:'appointment_date,medication,patient_id,doctor_id,fees'},function(result){
            if(result.code==200){
              console.log("result.data")
              console.log(result.data)
              $scope.users = result.data;
            } else{

            }
          });
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

        $scope.calculateAge = function(birthday) { // pass in player.dateOfBirth
          var ageDifMs = Date.now() - new Date(birthday);
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
  }]);
})();