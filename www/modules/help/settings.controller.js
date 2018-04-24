(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('settingsCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','SettingServices','AppointmentServices', '$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, SettingServices, AppointmentServices, $mdDialog) {
        var Id = $localStorage.User.id;

        var settings = {
          user_id: Id,
          status: true,
          type: [{ "type":"appointmentCreated", "notification": false},
                  { "type":"appointmentCancelled", "notification": false},
                  { "type":"appointmentChanged", "notification": false},
                  { "type":"appointmentRemainder", "notification": false},
                  { "type":"birthdayRemainder", "notification": false},
                  { "type":"followupCheckup", "notification": false},
                  { "type":"paymentAcceptance", "notification": false}]
          };
        var query = '(status=true)';
        SettingServices.get().get({user_id:Id,query:query,field:'type,user_id'},function(result){
          if(result.code==200){
            if(!result.data|| !result.data[0] || !result.data[0].type.length){
              SettingServices.savePost().save(settings,function(result){
                if(result.code==200){
                  SettingServices.get().get({user_id:Id,query:query,field:'type,user_id'},function(result){
                    if(result.code==200){
                      $scope.users = result.data;
                      notificationDisplay(result.data)
                    } else{
                    }
                  });
                } else{
                  console.log("error");
                }
              })
            } else{
              $scope.users = result.data;
              notificationDisplay(result.data)
            }
          } else{

          }
        });

        function notificationDisplay(result){
          $scope.users = result;
          if(result[0].type){
            $scope.users.appCreated = result[0].type.filter(function (noti) {
              return noti.type === 'appointmentCreated'; 
            }).pop();
            $scope.users.appCancelled = result[0].type.filter(function (noti) {
              return noti.type === 'appointmentCancelled'; 
            }).pop();
            $scope.users.appChanged = result[0].type.filter(function (noti) {
              return noti.type === 'appointmentChanged'; 
            }).pop();
            $scope.users.birthRemainder = result[0].type.filter(function (noti) {
              return noti.type === 'birthdayRemainder'; 
            }).pop();
            $scope.users.appRemainder = result[0].type.filter(function (noti) {
              return noti.type === 'appointmentRemainder'; 
            }).pop();
            $scope.users.follCheckup = result[0].type.filter(function (noti) {
              return noti.type === 'followupCheckup'; 
            }).pop();
            $scope.users.payAcceptance = result[0].type.filter(function (noti) {
              return noti.type === 'paymentAcceptance'; 
            }).pop();
          }
        };

        $scope.patientsInfo = function(Id, appointId){
            $state.go('patientData',{userId:Id,appointId:appointId});             
        };
        
        $scope.statusChange = function(settingId, user, type, ev){
          var data= {type:  [ $scope.users.appCreated,
                              $scope.users.appCancelled,
                              $scope.users.appChanged,
                              $scope.users.appRemainder,
                              $scope.users.birthRemainder,
                              $scope.users.follCheckup,
                              $scope.users.payAcceptance
                            ]};
          SettingServices.update().update({id:settingId,query:'(status=true)'},data,function(result){
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