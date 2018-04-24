(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('AppointmentTypeCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog','formlyConfig','$cordovaDatePicker', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog,formlyConfig,$cordovaDatePicker) {

    var Id = $localStorage.User.id;
    $scope.formData = {},$scope.appointment = {};
    $scope.morningTimeAdd = {};
    UserServices.getInfo().get({id:Id,field:'available_time,address,verified'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.user = result.data;
        $scope.address = result.data.address;
        var morningTime = $scope.morningTime  = result.data.available_time.filter(function (time) {
          return time.type === 'Morning';}).pop();
        $scope.appointment.morning = morningTime?morningTime.status:false;
        $scope.formData.morning_start_time =  morningTime?morningTime.start_time:new Date();
        $scope.formData.morning_end_time =  morningTime?morningTime.end_time:new Date();

        var regularTime = $scope.regularTime  = result.data.available_time.filter(function (time) {
          return time.type === 'Regular';}).pop();
        $scope.appointment.regular = regularTime?regularTime.status:false;
        $scope.formData.regular_start_time =  regularTime?regularTime.start_time:new Date();
        $scope.formData.regular_end_time =  regularTime?regularTime.end_time:new Date();

        var eveningTime = $scope.eveningTime  = result.data.available_time.filter(function (time) {
          return time.type === 'Evening';}).pop();
        $scope.appointment.evening = eveningTime?eveningTime.status:false;
        $scope.formData.evening_start_time =  eveningTime?eveningTime.start_time:new Date();
        $scope.formData.evening_end_time =  eveningTime?eveningTime.end_time:new Date();

        var mr_consultantTime = $scope.mr_consultantTime  = result.data.available_time.filter(function (time) {
          return time.type === 'MR_Consultant';}).pop();
        $scope.appointment.mr_consultant = mr_consultantTime?mr_consultantTime.status:false;
        $scope.formData.mr_consultant_start_time =  mr_consultantTime?mr_consultantTime.start_time:new Date();
        $scope.formData.mr_consultant_end_time =  mr_consultantTime?mr_consultantTime.end_time:new Date();

        var online_consultantTime = $scope.online_consultantTime  = result.data.available_time.filter(function (time) {
          return time.type === 'Online_Consultant';}).pop();
        $scope.appointment.online_consultant = online_consultantTime?online_consultantTime.status:false;
        $scope.formData.online_consultant_start_time =  online_consultantTime?online_consultantTime.start_time:new Date();
        $scope.formData.online_consultant_end_time =  online_consultantTime?online_consultantTime.end_time:new Date();


      } else{

      }
    })

    
    $scope.addressType = function(type, addType){
      console.log(addType)
       if('morningTime'==type){
        $scope.morningTime = {};
        $scope.morningTime.address_type = addType.address_type;
       } else if('regularTime'==type){
        $scope.regularTime = {};
        $scope.regularTime.address_type = addType.address_type;
       } else if('eveningTime'==type){
        $scope.eveningTime = {};
        $scope.eveningTime.address_type = addType.address_type;
       } else if('mr_consultantTime'==type){
        $scope.mr_consultantTime = {};
        $scope.mr_consultantTime.address_type = addType.address_type;
       } else if('online_consultantTime'==type){
        $scope.online_consultantTime = {};
        $scope.online_consultantTime.address_type = addType.address_type;
       } else{

       }

    }

    $scope.add = function(appointment, ev, morningTime){
      console.log(morningTime)
      // alert(JSON.stringify($scope.formData, null, 2));
      var morning = new Date($scope.formData.morning_end_time) - new Date($scope.formData.morning_start_time);
      var regular = new Date($scope.formData.regular_end_time) - new Date($scope.formData.regular_start_time);
      var evening = new Date($scope.formData.evening_end_time) - new Date($scope.formData.evening_start_time);
      var mr_consultant = new Date($scope.formData.mr_consultant_end_time) - new Date($scope.formData.mr_consultant_start_time);
      var online_consultant = new Date($scope.formData.online_consultant_end_time) - new Date($scope.formData.online_consultant_start_time);
      if(morning>=0&&regular>=0&&evening>=0&&mr_consultant>=0&&online_consultant>=0){
        var data = [];
        if(appointment.morning){
          var startTime = new Date($scope.formData.morning_start_time);
              startTime.setSeconds(0);
              startTime.setMilliseconds(0);
          var endTime = new Date($scope.formData.morning_end_time);
              endTime.setSeconds(0);
              endTime.setMilliseconds(0);
          var morning = {
            status: appointment.morning,
            address_type: $scope.morningTime.address_type,
            type: 'Morning',
            start_time: startTime,
            end_time: endTime
          }
          data.push(morning);
        }
        if(appointment.regular){
          var startTime = new Date($scope.formData.regular_start_time);
              startTime.setSeconds(0);
              startTime.setMilliseconds(0);
          var endTime = new Date($scope.formData.regular_end_time);
              endTime.setSeconds(0);
              endTime.setMilliseconds(0);
          var regular = {
            status:appointment.regular,
            address_type: $scope.regularTime.address_type,
            type: 'Regular',
            start_time: startTime,
            end_time: endTime
          }
          data.push(regular);
        }
        if(appointment.evening){
          var startTime = new Date($scope.formData.evening_start_time);
              startTime.setSeconds(0);
              startTime.setMilliseconds(0);
          var endTime = new Date($scope.formData.evening_end_time);
              endTime.setSeconds(0);
              endTime.setMilliseconds(0);
          var evening = {
            status: appointment.evening,
            address_type: $scope.eveningTime.address_type,
            type: 'Evening',
            start_time: startTime,
            end_time: endTime
          }
          data.push(evening);
        }
        if(appointment.mr_consultant){
          var startTime = new Date($scope.formData.mr_consultant_start_time);
              startTime.setSeconds(0);
              startTime.setMilliseconds(0);
          var endTime = new Date($scope.formData.mr_consultant_end_time);
              endTime.setSeconds(0);
              endTime.setMilliseconds(0);
          var mr_consultant = {
            status: appointment.mr_consultant,
            address_type: $scope.mr_consultantTime.address_type,
            type: 'MR_Consultant',
            start_time: startTime,
            end_time: endTime
          }
          data.push(mr_consultant)
        }
        if(appointment.online_consultant){
          var startTime = new Date($scope.formData.online_consultant_start_time);
              startTime.setSeconds(0);
              startTime.setMilliseconds(0);
          var endTime = new Date($scope.formData.online_consultant_end_time);
              endTime.setSeconds(0);
              endTime.setMilliseconds(0);
          var online_consultant = {
            status: appointment.online_consultant,
            address_type: $scope.online_consultantTime.address_type,
            type: 'Online_Consultant',
            start_time: startTime,
            end_time: endTime
          }
          data.push(online_consultant);
        }
        console.log("=======data=======")
        console.log(data)
        data = {available_time : data}
        UserServices.update().update({id:Id,query:'(type=doctor)',action:'all'},data,function(result){
          if(result.code==200){
            console.log(result.data);
              // $state.go('viewRoom');
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Success!')
                .textContent(result.message)
                .ariaLabel('Successfully updated!')
                .ok('Got it!')
                .targetEvent(ev)
            );
          } else{
            console.log("error")
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error!')
                .textContent(result.message)
                .ariaLabel('Error message!')
                .ok('Got it!')
                .targetEvent(ev)
            );
          }
        })
      } else{
        $mdDialog.show(
          $mdDialog.alert()
            .title('Warning!')
            .content('Something went wrong! Please enter valid time.')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }

    }

    $scope.cancel = function(){
      $state.go('viewRoom');
    };

    // ONLY SUBMIT IF I HAVE VALID DATA
    $scope.doSubmit = function() {
      alert(JSON.stringify($scope.formData, null, 2));
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
   
    $scope.morningFields = [{
        key: 'morning_start_time',
        type: 'inputDatePicker',
        templateOptions: {
          dateFormat: 'shortTime',
          onclick: function($modelValue, $options) {
            var options = {
              date: new Date(),
              mode: 'time', // 'date' or 'time'
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
      },{
        key: 'morning_end_time',
        type: 'inputDatePicker',
        templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    }];
    $scope.regularFields= [{
      key: 'regular_start_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    },{
      key: 'regular_end_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    $scope.eveningFields = [{
      key: 'evening_start_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    },{
      key: 'evening_end_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    }];
    $scope.mr_consultantFields = [{
      key: 'mr_consultant_start_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    },{
      key: 'mr_consultant_end_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    }];
    $scope.online_consultantFields = [{
      key: 'online_consultant_start_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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
    },{
      key: 'online_consultant_end_time',
      type: 'inputDatePicker',
      templateOptions: {
        dateFormat: 'shortTime',
        onclick: function($modelValue, $options) {
          var options = {
            date: new Date(),
            mode: 'time', // 'date' or 'time'
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