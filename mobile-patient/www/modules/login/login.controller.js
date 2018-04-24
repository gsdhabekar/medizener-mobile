(function(){
	'use strict';

	var app = angular.module('login.controller', []);

	// Main app controller
	app.controller('loginCtrl', ['$scope','$mdSidenav','$state','$rootScope','$location','UserServices','$localStorage','$window','AuthService','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $location, UserServices, $localStorage, $window, AuthService, $mdDialog) {

        $scope.hideButton = $rootScope.isActive;
        $scope.hideHeader = true;
        $scope.user = {};

        $scope.login = function(user, ev){
            user.type  = 'patient';
            UserServices.login().get(user,function(result){
                if(result.code==200){
                    $localStorage.User = $scope.usr = result.data;
                    $state.go('app');
                    AuthService.me().get({status:'me'},function(res){
                      if(res.code==200){
                        var data = { deviceId: $localStorage.registrationToken };
                        UserServices.update().update({id:res.data.id,query:'(type=patient)',action:'all'},data,function(result){
                            if(result.code==200){
                                console.log("Success")
                            } else{
                                console.log("Error")
                            }
                        });
                        $scope.usr.id = res.data.id;
                        $localStorage.User = $scope.usr;
                        setTimeout(function(){
                            $window.location.reload(); 
                        },1000);
                      } else{
                        console.log("error");
                      }
                    });
                } else{
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
        // Signup page redirection
        $scope.newAccount = function(){
            $state.go('signup');
        }
        // Reset data
    	$scope.cancel = function(){
            $scope.user = {};
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