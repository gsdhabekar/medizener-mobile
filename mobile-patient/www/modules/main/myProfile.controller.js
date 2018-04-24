(function(){
	'use strict';

	var app = angular.module('main.controller', []);

    app.controller('myProfileCtrl', ['$scope','$mdSidenav','$state','$http','$URL','$rootScope','$mdDialog','UserServices','$localStorage','formlyConfig','$cordovaDatePicker', 'ComponentsServices', function ($scope, $mdSidenav, $state, $http, $URL, $rootScope, $mdDialog, UserServices, $localStorage, formlyConfig, $cordovaDatePicker, ComponentsServices) {
        $scope.formData = {};
        var Id = $localStorage.User.id;
        $scope.formData.startDateTime = new Date();

        UserServices.getInfo().get({id:Id,field:'first_name,last_name,phone_number,email,gender,dob,blood_group,specification,profile'},function(result){
          if(result.code==200){
            $scope.user = result.data;
            $scope.formData.startDateTime = ((result.data&&result.data.dob)?result.data.dob : new Date());
          } else{

          }
        });

        $scope.gender = ('male female').split(' ').map(function(gender) {
          return {abbrev: gender};
        });

        $scope.blood = ('A+ A- B+ B- AB+ AB- O+ O- Oh').split(' ').map(function(blood) {
          return {abbrev: blood};
        });
        
        var query = '(type=specification,is_deleted=false,status=true)';
        ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
          if(result.code==200){
            $scope.category = result.data;
          } else{
            $scope.category = [];
          }
        });

        $scope.update = function(user,ev){
          var data = {
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender.toLowerCase(),
            dob: $scope.formData.startDateTime,
            phone_number: user.phone_number,
            blood_group: user.blood_group
          };

          UserServices.update().update({id:user._id,query:'(type=patient)',action:'all'},data,function(result){
            if(result.code==200){
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Success!')
                  .content(result.message)
                  .ok('Nice')
                  .targetEvent(ev)
              );
            }else{
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Error!')
                  .content(result.message)
                  .ok('Error')
                  .targetEvent(ev)
              );
            }
          })
        }
        $scope.cancel = function(){
          $state.go('app');
        }
        // Upload image functionality
        $scope.demo = {
          showTooltip : false,
          tipDirection : ''
        };
        var originatorEv;
        this.files4 = [];
        this.openMenu = function($mdOpenMenu, ev) {
          originatorEv = ev;
          $mdOpenMenu(ev);
        };

        $scope.cancelProfile = function(){
            originatorEv = null;
            this.ctrl = {};
        }

        $scope.uploadProfile = function(files){
          var fd = new FormData();
              fd.append('user_id',Id); 
              fd.append('type','profile'); 
              fd.append('image',files.files4[0]);

          $http.post($URL+'/upload', fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
          .success(function(result){
            if(result.code==200){
              $state.go($state.current, {}, {reload: true});
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Success!')
                  .content(result.message)
                  .ok('Nice')
                  .targetEvent(originatorEv)
              );
              originatorEv = null;
            }else{
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Error!')
                  .content(result.message)
                  .ok('Error')
                  .targetEvent(originatorEv)
              );
              originatorEv = null;
            }
          });
        }

        this.announceClick = function(index) {
          $mdDialog.show(
            $mdDialog.alert()
              .title('You clicked!')
              .content('You clicked the menu item at index ' + index)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
          originatorEv = null;
        };


        // ONLY SUBMIT IF I HAVE VALID DATA
        $scope.doSubmit = function() {
          // alert(JSON.stringify($scope.formData, null, 2));
        }
     
        function createFormlyType() {
          formlyConfig.setType({
            name: 'inputDatePicker',
            templateUrl: 'inputDatePicker.html',
            defaultOptions: {
            }
          });
        }
       
        createFormlyType()
       
        $scope.formFields = [{
          key: 'startDateTime',
          type: 'inputDatePicker',
          templateOptions: {
            dateFormat: 'mediumDate',
            onclick: function($modelValue, $options) {
              var options = {
                date: new Date(),
                mode: 'date', // 'date' or 'time'
                minDate: true,
                allowOldDates: true,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
              };
              $cordovaDatePicker.show(options).then(function(date) {
                $modelValue[$options.key] = date;
              });
            }
          }
        }]
    }]);
})();