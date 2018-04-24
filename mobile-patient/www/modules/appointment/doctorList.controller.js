(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('doctorListCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage', 'UserServices','ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, ComponentsServices) {

      $scope.hideButton = $rootScope.isActive;
      
      var Id = $localStorage.User.id;
      var specialtyId = $state.params.specialityId;
      var query = '(type=doctor,is_deleted=false,verified=true,specification='+specialtyId+')';
      UserServices.get().get({query:query,field:'prefix,first_name,last_name,phone_number,specification,fees,address,available_time,profile,experience,hospital_name,gender'},function(result){
        if(result.code==200){
          $scope.users = result.data;
        } else{
          $scope.users = [];
        }
      });

      var query = '(type=specification,is_deleted=false,status=true)';
      ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
        if(result.code==200){
          $scope.category = result.data;
        } else{
          $scope.category = [];
        }
      });

     $scope.filterData = [
      {type:"price",specialtyName:'Fees'},
      {type:"area",specialtyName:'Area'},
      {type:"available_time",specialtyName:'Availability'},
      {type:"gender",specialtyName:'Gender'}
    ];
    $scope.filterChange = function(data){
      if(data==='price'){
        $scope.users = $scope.users.sort(priceFilter)
      } else if(data==='gender'){
        var query = '(type=doctor,is_deleted=false,specification='+specialtyId+')';
        var sort = '(gender=1)';
        UserServices.get().get({query:query,sort:sort,field:'prefix,first_name,last_name,phone_number,specification,fees,address,available_time,profile,experience,hospital_name,gender'},function(result){
          if(result.code==200){
            $scope.users = result.data;
          } else{
             $scope.users = [];
          }
        });
      } else if(data==='area'){
        $scope.users = $scope.users.sort(areaFilter)
      }
    }

    function priceFilter(a, b){
      var indexA = a.fees.findIndex(x =>x.type ==='hospital_fees')
      var indexB = b.fees.findIndex(x =>x.type ==='hospital_fees')
      let comparison = 0;
      if ((indexA>-1 && a.fees[indexA].price) > (indexB >-1 && b.fees[indexB].price)) {
        comparison = 1;
      } else if ( (indexB>-1 && b.fees[indexB].price) > (indexA>-1 && a.fees[indexA].price)) {
        comparison = -1;
      }
      return comparison;
    }
    function areaFilter(a, b){
      var indexA = a.address.findIndex(x =>x.address_type ==='hospital')
      var indexB = b.address.findIndex(x =>x.address_type ==='hospital')
      let comparison = 0;
      if ((indexA>-1 && a.address[indexA].postal_code) > (indexB >-1 && b.address[indexB].postal_code)) {
        comparison = 1;
      } else if ( (indexB>-1 && b.address[indexB].postal_code) > (indexA>-1 && a.address[indexA].postal_code)) {
        comparison = -1;
      }
      return comparison;
    }
  	// Go to doctorList
  	$scope.doctorList = function(){
  		$state.go('doctorList');
  	};
    // redirect to specific page of application
    $scope.redirectPage = function(url){
        $state.go(url);
        $mdSidenav('left').close();               
    };
    // Book Appointment Redirect
    $scope.bookAppointment = function(userId){
        $state.go('bookAppointment',{userId: userId});
    }
    // Add Appointment
    $scope.addAppointment = function(){
        $state.go('dashboardPatientAppointment');
    }
    // Staff Information
    $scope.staffInfo = function(){
        $state.go('viewStaff');
    }
    // patient room
    $scope.admitPatient = function(){
        $state.go('viewRoom');
    }
	}]);
})();