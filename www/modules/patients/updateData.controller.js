(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('updateDataCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog','formlyConfig','$cordovaDatePicker', 'ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog, formlyConfig, $cordovaDatePicker, ComponentsServices) {

    $scope.hideButton = $rootScope.isActive;
    $scope.formData = {};
    var Id = $localStorage.User.id;

    UserServices.getInfo().get({id:Id,field:'first_name,last_name,phone_number,email,gender,dob,blood_group,specification,experience,grade,interval_time,hospital_name,address,verified'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.user = result.data;
        $scope.formData.startDateTime = ((result.data&&result.data.dob)?result.data.dob : new Date());
        $scope.user.hospital_address1 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address1;
        $scope.user.hospital_address2 = result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].address2;
        $scope.user.hospital_city= result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].city;
        $scope.user.hospital_state= result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].state;
        $scope.user.hospital_pincode= result.data&&result.data.address&&result.data.address[0]&&result.data.address[0].postal_code;
      } else{

      }
    })

    $scope.gender = ('male female').split(' ').map(function(gender) {
      return {abbrev: gender};
    });

    $scope.blood = ('A+ A- B+ B- AB+ AB- O+ O- Oh').split(' ').map(function(blood) {
      return {abbrev: blood};
    });

    $scope.update = function(user, ev){
      console.log(user)
      var data = {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender.toLowerCase(),
        dob: $scope.formData.startDateTime,
        specification: user.specification,
        grade: user.grade,
        hospital_name: user.hospital_name,
        phone_number: user.phone_number,
        experience: user.experience,
        blood_group: user.blood_group,
        interval_time: user.interval_time,
        address:[{
          address_type: 'hospital',
          address1: user.hospital_address1,
          address2: user.hospital_address2,
          city: user.hospital_city,
          state: user.hospital_state,
          postal_code: user.hospital_pincode
        }]
      };

      UserServices.update().update({id:user._id,query:'(type=doctor)',action:'all'},data,function(result){
        if(result.code==200){
          console.log(result.message);
          $state.go('app');
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(ev)
          );
        }else{
          console.log(result.message);
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
        console.log("result.data")
        console.log(result.data)
        $scope.category = result.data;
      } else{

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