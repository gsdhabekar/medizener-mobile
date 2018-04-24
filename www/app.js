(function(){
    'use strict';
    // Ionic Starter App
    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    // 'starter.controllers' is found in controllers.js
    var app = angular.module('Medizener', [
        'ionic',
        'ngMaterial', 
        'common.service',
        'liqliq-routes',
        'oc.lazyLoad',
        'ngCordova',
        'licliq.theme',
        'ngStorage',
        'ngFileUpload',
        'formlyIonic'
    ]);

    // Define applications constants values
    // app.constant('$URL', 'http://34.195.100.48/api/v1');
    app.constant('$URL', 'http://localhost:8888/api/v1');
    // app.constant ('$URL', 'http://api.medizener.com/api/v1');


    // Run configuration of ionic 
    app.run(function ($ionicPlatform, $cordovaDevice, $http, $URL, $localStorage) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // check device ready state 
            document.addEventListener("deviceready", function () { 

                var push = PushNotification.init({  
                    "android": {"senderID": "391747712355"},
                                "ios": {
                                        "alert": "true", 
                                        "badge": "true", 
                                        "sound": "true"
                                    },
                                "windows": {} } );
                
                push.on('registration', function(data) {

                    $localStorage.registrationToken = data.registrationId;//registrationToken
                    
                    var body = {
                        'model': $cordovaDevice.getModel(),
                        'platform': $cordovaDevice.getPlatform(),
                        'uuid': $cordovaDevice.getUUID(),
                        'version': $cordovaDevice.getVersion(),
                        'registrationToken': data.registrationId
                    };
                    // Save device id of user 
                    $http.post($URL + '/devices', body)
                        .success(function (res){
                            if(res.code !== 401)
                                console.info(res.message);
                            else
                                console.info(res.message);
                    });
                });

                push.on('notification', function(data) {
                    console.log("notification data")
                    console.log(data)
                    // data.message,
                    // data.title,
                    // data.count,
                    // data.sound,
                    // data.image,
                    // data.additionalData
                });

                push.on('error', function(e) {
                    // e.message
                });
            });
        });
    });

    // Header and Footer Controller
    app.controller("navCtrl",['$scope','$mdSidenav','$state','$rootScope','$localStorage','$location', '$window', 'AuthService', 'UserServices', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, $location, $window, AuthService, UserServices){

        if($localStorage&&$localStorage.User&&$localStorage.User.id){
            var Id = $localStorage.User.id;
            UserServices.getInfo().get({id:Id,field:'first_name,last_name,profile'},function(result){
                if(result.code==200){
                    $scope.user = result.data;
                } else if(result.code===401){
                    localStorage.clear();
                }
            });
        } else{
            localStorage.clear();
        }
        // Opening menu
        $scope.openNav = function(){
            setTimeout(function(){$mdSidenav('right').close()},1);
            setTimeout(function(){ $mdSidenav('left').open()},1);
        };
        // Opening right menu
        $scope.openNavRight = function(){
            setTimeout(function(){$mdSidenav('left').close()},1);
            setTimeout(function(){$mdSidenav('right').open()},1);
        };
        $scope.manageLSwipe = function(){
            if($mdSidenav('left').isOpen()){
                setTimeout(function(){$mdSidenav('left').close()},1);
            }else{
                setTimeout(function(){$mdSidenav('right').open()},1);
            }
        };
        $scope.manageRSwipe = function(){
            if($mdSidenav('right').isOpen()){
                setTimeout(function(){$mdSidenav('right').close()},1);
            }else{
                setTimeout(function(){$mdSidenav('left').open()},1);
            }
        };
        // Test data
        var imagePath = 'assets/images/60.jpeg';
        $scope.imagePath = 'assets/images/background.jpg';
        // Message List
        $scope.messages = [
          {
            face : imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          },
          {
            face : imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
          }
        ];
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

        // Left and Right menu
        $scope.redirectPage = function(val){
            if($mdSidenav('left').isOpen())
                setTimeout(function(){$mdSidenav('left').close()},1);
            if($mdSidenav('right').isOpen())
                setTimeout(function(){$mdSidenav('right').close()},1);
            $state.go(val);
        }
        // Opening menu
        $scope.openNav = function(){
            setTimeout(function(){$mdSidenav('right').close()},1);
            setTimeout(function(){ $mdSidenav('left').open()},1);
        };
        // Opening right menu
        $scope.openNavRight = function(){
            setTimeout(function(){$mdSidenav('left').close()},1);
            setTimeout(function(){$mdSidenav('right').open()},1);
        };
        $scope.manageLSwipe = function(){
            if($mdSidenav('left').isOpen()){
                setTimeout(function(){$mdSidenav('left').close()},1);
            }else{
                setTimeout(function(){$mdSidenav('right').open()},1);
            }
        };

        $scope.search = function(data){
            console.log(data)
            $state.go('patientSearchList',{keywords: data});
        }

        $scope.manageRSwipe = function(){
            if($mdSidenav('right').isOpen()){
                setTimeout(function(){$mdSidenav('right').close()},1);
            }else{
                setTimeout(function(){$mdSidenav('left').open()},1);
            }
        };

        //Logout
        $scope.logout = function(){
            localStorage.clear();
            AuthService.me().get({status:'logout'},function(result){
                if(result.code){
                    localStorage.clear();
                    $window.location.reload(); 
                    setTimeout(function(){
                        $window.location.reload(); 
                        $state.go('login');
                    },2000);
                } else{
                    console.log("error")
                }
            });
        } 
        $scope.homeClick = function(){
            $state.go('app');
            // location.reload();
        }
    }]);
})();
