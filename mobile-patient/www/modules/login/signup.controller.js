(function(){
	'use strict';

	var app = angular.module('signup.controller', []);

	// Main app controller
	app.controller('signupCtrl', ['$scope','$mdSidenav','$state','$rootScope','$location','UserServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $location, UserServices, $mdDialog) {

        $scope.hideButton = $rootScope.isActive;
        // $scope.user = {};
        $scope.prefix = ('Mr Miss Mrs Dr').split(' ').map(function(prefix) {
          return {abbrev: prefix};
        });
        // Create new account
        $scope.signup = function(user, ev){
            user.type = 'patient';
            UserServices.signup().save(user,function(result){
                if(result.code==200){
                    $state.go('login');
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
                } else{
                  console.log("error");
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
        // Cancel menu
        $scope.cancel = function(){
            $state.go('login');
        }


      	// Go to intro
      	$scope.gotoIntro = function(){
      		$state.go('intro');
      	};

        // redirect to specific page of application
        $scope.redirectPage = function(url){
            $state.go(url);
            $mdSidenav('left').close();               
        };

        // Logout from application
        $scope.logout = function(){
            console.log("Logout from application!!!");
        };
	}]);
})();