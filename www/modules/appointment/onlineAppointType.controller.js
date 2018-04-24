(function(){
  'use strict';

  var app = angular.module('main.controller', []);

  // Main app controller
  app.controller('onlineAppointTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices, $mdDialog) {

        var Id = $localStorage.User.id;
        UserServices.getInfo().get({id:Id,field:'available_time'},function(result){
          if(result.code==200){
            console.log(result.data)
            $scope.user = result.data;
          } else{

          }
        });

        $scope.patientsInfo = function(Id, appointId){
            $state.go('viewPatientDetail',{userId:Id,appointId:appointId});             
        };
        
        $scope.current = function(date){
          console.log("=======currentDate=====")
          var currentDate = new Date();
          var getHours = currentDate.getHours();
          var getMinutes = currentDate.getMinutes();
          var getHours = currentDate.getHours();
          var getMinutes = currentDate.getMinutes();
          var minutesSub = 30;
          if(date){
            currentDate = new Date(date);
            getHours = getMinutes = minutesSub = 0;
          }

          $scope.date = currentDate;
          var startDate = new Date(currentDate.setDate(currentDate.getDate()));
            startDate.setHours(getHours, getMinutes, 0, 0);
            startDate.setHours(getHours, startDate.getMinutes()-minutesSub, 0, 0);
            startDate = new Date(startDate).toISOString();
          var endDate = currentDate;
            endDate.setHours(23, 59, 59, 999);
            endDate = new Date(endDate).toISOString();
          $scope.displayDate = currentDate;
          console.log(startDate)
          console.log(endDate)
          var query = '(doctor_id='+Id+',start_date='+startDate+',end_date='+endDate+',status=false,booked_status=true,appointment_status.status=scheduled,$or=type?video_fees^type?audio_fees)';
          console.log(query)
          AppointmentServices.get().get({query:query,field:'appointment_date,patient_id,booked_status,appointment_status,status,fees,type'},function(result){
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
          if(todayDate<compareDate){
            $scope.date.setDate($scope.date.getDate() - 1);
            console.log($scope.date.getDate())
            var dateV = $scope.date;
                dateV = dateV.setHours(0, 0, 0, 0);
            var dateC = todayDate;
                dateC = dateC.setHours(0, 0, 0, 0);

            if(dateC===dateV){
              $scope.current();
            }else{
              $scope.current($scope.date);
            }
          }
        }
        $scope.statusChange = function(appointId, status, appointDate, ev){
          console.log(appointDate);
          var data = {status: status};
          AppointmentServices.update().update({id:appointId},data,function(result){
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
                $state.go('app');
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

  }]);
})();