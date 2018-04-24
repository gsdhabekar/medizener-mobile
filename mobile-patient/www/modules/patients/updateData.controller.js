(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('updateDataCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog','formlyConfig','$cordovaDatePicker','ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog, formlyConfig, $cordovaDatePicker, ComponentsServices) {

    $scope.hideButton = $rootScope.isActive;
    $scope.formData = {};
    var Id = $localStorage.User.id;

    UserServices.getInfo().get({id:Id,field:'first_name,last_name,phone_number,email,gender,dob,blood_group,specification,address'},function(result){
      if(result.code==200){
        $scope.user = result.data;
        $scope.formData.startDateTime = ((result.data&&result.data.dob)?result.data.dob : new Date());
        var homeAddress = result.data.address.filter(function (add) {
            return add.address_type === 'home';}).pop();
        if(homeAddress){
          $scope.user.home_address1 = homeAddress.address1;
          $scope.user.home_address2 = homeAddress.address2;
          $scope.user.home_city = homeAddress.city;
          $scope.user.home_state = homeAddress.state;
          $scope.user.home_pincode = homeAddress.postal_code;
        }
      } else{

      }
    })

    $scope.gender = ('male female').split(' ').map(function(gender) {
      return {abbrev: gender};
    });

    $scope.blood = ('A+ A- B+ B- AB+ AB- O+ O- Oh').split(' ').map(function(blood) {
      return {abbrev: blood};
    });

    $scope.patientType = ('Regular FollowUp Friendly').split(' ').map(function(type) {
      return {abbrev: type};
    });

    $scope.update = function(user, ev){
      var data = {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender.toLowerCase(),
        dob: $scope.formData.startDateTime,
        specification: user.specification,
        medical_reg_no: user.medical_reg_no,
        hospital_name: user.hospital_name,
        phone_number: user.phone_number,
        experience: user.experience,
        blood_group: user.blood_group,
        interval_time: user.interval_time,
        address:[{
          address_type: 'home',
          address1: user.home_address1,
          address2: user.home_address2,
          city: user.home_city,
          state: user.home_state,
          postal_code: user.home_pincode
        }]
      };

      UserServices.update().update({id:user._id,query:'(type=patient)',action:'all'},data,function(result){
        if(result.code==200){
          $state.go('app');
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

    var query = '(type=specification,is_deleted=false,status=true)';
    ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
      if(result.code==200){
        $scope.category = result.data;
      } else{
        $scope.category = [];
      }
    });

    $scope.cancel = function(){
      $state.go('app');
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