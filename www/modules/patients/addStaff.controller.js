(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('addStaffCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','AuthService','$mdDialog','formlyConfig','$cordovaDatePicker', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, AuthService, $mdDialog, formlyConfig, $cordovaDatePicker) {

    $scope.formData = {};
    var Id = $localStorage.User.id;
    $scope.formData.startDateTime = new Date();

    $scope.prefix = ('Mr Miss Mrs').split(' ').map(function(prefix) {
      return {abbrev: prefix};
    });

    $scope.blood = ('A+ A- B+ B- AB+ AB- O+ O- Oh').split(' ').map(function(blood) {
      return {abbrev: blood};
    });

    $scope.add = function(user, ev){
      var gender = 'female';
      if(user.prefix=="Mr"){
        gender = 'male';
      }
      var data = {
        prefix: user.prefix,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: gender,
        email: user.email,
        password: 'PassStaff@me01',
        phone_number: user.phone_number,
        dob: $scope.formData.startDateTime,
        medical_reg_no: user.medical_reg_no?user.medical_reg_no:"null",
        experience: user.experience,
        blood_group: user.blood_group,
        specification: user.specification,
        fees: [{
          price: user.payment,
          type: 'salary'
        }],
        type: 'staff',
        user_id: Id,
        address:[{
          address_type: 'home',
          address1: user.address1,
          address2: user.address2,
          city: user.city,
          state: user.state,
          postal_code: user.pincode
        }]
      };

      UserServices.signup().save(data,function(result){
        if(result.code==200){
          console.log(result.data);
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Success!')
              .textContent(result.message)
              .ariaLabel('Successfully added!')
              .ok('Got it!')
              .targetEvent(ev)
          );
          $state.go('app');
        } else{
          console.log("error")
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Error!')
              .textContent(result.message)
              .ariaLabel('Alert Dialog Demo')
              .ok('Got it!')
              .targetEvent(ev)
          );
        }
      })
    }

  	$scope.cancel = function(){
  		$state.go('viewStaff');
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