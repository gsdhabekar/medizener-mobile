(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('MainCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage', function ($scope, $mdSidenav, $state, $rootScope,$localStorage) {

        $scope.hideButton = $rootScope.isActive;
        
        // Opening menu
    	// $scope.openNav = function(){
    	// 	$mdSidenav('left').toggle();
    	// };
        // Opening right menu
        // $scope.openNavRight = function(){
        //     $mdSidenav('right').toggle();
        // };
        console.log($localStorage.User)
        console.log("$localStorage.User")
        if($localStorage && $localStorage.User && ($localStorage.User.token != null || $localStorage.User.token != undefined)) {
            // $state.go('/app')
        } else{
            $state.go('/login');
        }
        
        var imagePath = 'assets/images/60.jpeg';
        $scope.imagePath = 'assets/images/background.jpg';

        $scope.messages2 = [
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : $scope.imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          }
        ];
    	// Go to intro
    	$scope.gotoIntro = function(){
    		$state.go('intro');
    	};

        // redirect to specific page of application
        $scope.redirectPage = function(url){
            $state.go(url);
            $mdSidenav('left').close();               
        };
        // Book Appointment Redirect
        $scope.bookAppointment = function(){
            $state.go('appointmentList');
        }
        // Add Appointment
        $scope.addAppointment = function(){
            $state.go('dashboardPatientAppointment');
        }
        // Online Appointment
        $scope.onlineAppointment = function(){
            $state.go('onlineAppointType');
        }
        // Staff Information
        $scope.staffInfo = function(){
            $state.go('viewStaff');
        }
        // Patient Information
        $scope.patientInfo = function(){
            $state.go('viewAppointmentPatient');
        }
        // patient room
        $scope.admitPatient = function(){
            $state.go('viewRoom');
        }
        // emergencyNo
        $scope.emergencyNo = function(){
            $state.go('emergencyNo');
        }
        

	}]);
    // app.controller('myProfileCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices', function ($scope, $mdSidenav, $state, $rootScope,UserServices) {
    //     //to get user data
    //     var condition = {_id:'57c08d1c807739ce1275b199'}
    //     UserServices.getUser().get(condition,function(result){
    //         if(result.code==200){
    //             console.log(result.data)
    //             $scope.user = result.data[0];
    //         } else{
    //             console.log(result.message);
    //         }
    //     })
    //     $scope.update = function(user){
    //         user.gender = 'female';
    //         user.type = 'doctor';
    //         if(user.prefix=='Mr'){
    //             user.gender='male';
    //         }
    //         UserServices.updateUser(user._id).update(user,function(result){
    //             if(result.code==200){
    //                 console.log(result.code)
                   
    //             } else{
    //                 console.log("error")
    //             }
    //         })
    //     }
    // }]);
})();