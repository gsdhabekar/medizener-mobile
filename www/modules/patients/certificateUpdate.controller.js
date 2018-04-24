(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('certificateUpdateCtrl', 
    ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','AuthService','$mdDialog', '$URL', '$http',
    function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, AuthService, $mdDialog, $URL, $http) {

    $scope.hideButton = $rootScope.isActive;
  	var Id = $localStorage.User.id;

    $scope.demo = {
      showTooltip : false,
      tipDirection : ''
    };
    var originatorEv;
    this.files1 = [];
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    var Id = $localStorage.User.id;
    UserServices.getInfo().get({id:Id,field:'profile,degree_certificate,medical_reg_certificate,business_card,verified'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.user = result.data;
      } else{

      }
    })


    $scope.uploadDegree = function(files){
      var fd = new FormData();
          fd.append('user_id',Id); 
          fd.append('type','degree_certificate');
          fd.append('image',files.files1[0]);
      $http.post($URL+'/upload', fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
      .success(function(result){
        if(result.code==200){
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error!')
              .content(result.message)
              .ok('Error')
              .targetEvent(originatorEv)
          );
        }
      });
    } 

    $scope.uploadCertificate = function(files){
      var fd = new FormData();
          fd.append('user_id',Id); 
          fd.append('type','medical_reg_certificate'); 
          fd.append('image',files.files2[0]);

      $http.post($URL+'/upload', fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
      .success(function(result){
        if(result.code==200){
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error!')
              .content(result.message)
              .ok('Error')
              .targetEvent(originatorEv)
          );
        }
      });
    } 

    $scope.uploadBusinessCard = function(files){
      var fd = new FormData();
          fd.append('user_id',Id); 
          fd.append('type','business_card'); 
          fd.append('image',files.files3[0]);

      $http.post($URL+'/upload', fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
      .success(function(result){
        if(result.code==200){
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error!')
              .content(result.message)
              .ok('Error')
              .targetEvent(originatorEv)
          );
        }
      });
    }

    $scope.uploadProfile = function(files){
      var fd = new FormData();
          fd.append('user_id',Id); 
          fd.append('type','profile'); 
          fd.append('image',files.files4[0]);

      $http.post($URL+'/upload', fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
      .success(function(result){
        if(result.code==200){
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(originatorEv)
          );
        }else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error!')
              .content(result.message)
              .ok('Error')
              .targetEvent(originatorEv)
          );
        }
      });
    }


    this.announceClick = function(index) {
      // $mdDialog.show(
      //   $mdDialog.alert()
      //     .title('You clicked!')
      //     .content('You clicked the menu item at index ' + index)
      //     .ok('Nice')
      //     .targetEvent(originatorEv)
      // );
      originatorEv = null;
    };
    // Go to intro
  	$scope.patientData = function(){
  		$state.go('patientData');
  	};
	}]);
})();