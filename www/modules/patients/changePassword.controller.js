(function(){
	'use strict';

	var app = angular.module('main.controller', []);

  // Match for password check
  app.directive("match", function() {
    return{require: "ngModel", restrict: "A", scope: {match: "="}, link: function(e, i, n, t) {
        e.$watch(function() {
          var i = t.$modelValue || t.$$invalidModelValue;
          return t.$pristine && angular.isUndefined(i) || e.match === i
        }, function(e) {
        t.$setValidity("match", e)
      })
    }}
  })
	// Main app controller
	app.controller('changePasswordCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','AuthService','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, AuthService, $mdDialog) {
    var Id = $localStorage.User.id;
    $scope.update = function(user, ev){
      var data = {
        old_password: user.old_password,
        new_password: user.new_password
      };
      UserServices.update().update({id:Id,action:'password'},data,function(result){
        if(result.code==200){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Success!')
              .textContent(result.message)
              .ariaLabel('Alert Dialog Demo')
              .ok('Got it!')
              .targetEvent(ev)
          );
          $state.go('app');
        } else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Password error!')
              .textContent(result.message)
              .ariaLabel('Alert Dialog Demo')
              .ok('Got it!')
              .targetEvent(ev)
          );
        }
      })
    }
    $scope.cancel = function(){
      $state.go('app');
    };
	}]);
})();