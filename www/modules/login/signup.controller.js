(function(){
	'use strict';

	var app = angular.module('signup.controller', []);

	// Main app controller
	app.controller('signupCtrl', ['$scope','$mdSidenav','$state','$rootScope','$location','UserServices','$mdDialog', 'ComponentsServices', function ($scope, $mdSidenav, $state, $rootScope, $location, UserServices, $mdDialog, ComponentsServices) {

        $scope.hideButton = $rootScope.isActive;
        $scope.user = {};
        // Create new account
        $scope.signup = function(user, ev){
            user.type = 'doctor';
            user.prefix = 'dr';
            UserServices.signup().save(user,function(result){
                if(result.code==200){
                    console.log(result.code)
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

        var query = '(type=specification,is_deleted=false,status=true)';
        ComponentsServices.get().get({query:query,field:'type,name,status'},function(result){
          if(result.code==200){
            console.log("result.data")
            console.log(result.data)
            $scope.category = result.data;
          } else{
            $scope.category = [];
          }
        });


      	$scope.openNav = function(){
      		$mdSidenav('left').toggle();
      	};

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