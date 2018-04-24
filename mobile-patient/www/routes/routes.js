(function(){
	'use strict';

	// Angular JS Routes modules
	var app = angular.module('liqliq-routes', []);

	// LicLiq UI Routes configuration
	app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        
        //================================================ 
        // Add an interceptor for AJAX errors
        //================================================
        
        $httpProvider.interceptors.push(function ($q, $location, $window, $localStorage) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage && $localStorage.User && $localStorage.User.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.User.token;
                    }
                    return config;
                },
                // handle the case where the user is not authenticated
                response: function (response) {
                    if (response.status === 401) {
                        $location.url('/login');
                    }
                    return response || $q.when(response);
                }
            };
        })

        // $httpProvider.interceptors.push(function($q, $location) {
        //     return function(promise) {
        //         return promise.then(function(response) {
        //             return response;
        //         }, function(response) {
        //             if (response.status === 401)
        //                 // $location.url('/login');
        //             return $q.reject(response);
        //         });
        //     }
        // });
        // ************************ End ***************************

        // Application routes
        $stateProvider
	        .state('intro', {
	            url: '/intro',
                cache: false,
	            templateUrl: 'views/intro.html',
                resolve: {
                    isLoggedIn : authStatus()
                }
	        })
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'modules/login/login.html',
                controller : 'loginCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/login/login.controller.js');
                    }]
                }
            })
            .state('signup', {
                url: '/signup',
                cache: false,
                templateUrl: 'modules/login/signup.html',
                controller : 'signupCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/login/signup.controller.js');
                    }]
                }
            })
	        .state('app', {
	            url: '/app',
                cache: false,
	            templateUrl: 'modules/main/main.html',
	            controller : 'MainCtrl',
	            resolve: {
                    isLoggedIn : authStatus(),
				    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				    	return $ocLazyLoad.load('modules/main/main.controller.js');
				    }]
				}
	        })
            // myProfile
            .state('myProfile', {
                url: '/myProfile',
                cache: false,
                templateUrl: 'modules/main/myProfile.html',
                controller : 'myProfileCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/main/myProfile.controller.js');
                    }]
                }
            })
            .state('settings', {
                url: '/settings',
                cache: false,
                templateUrl: 'modules/home/settings.html',
                controller : 'settingsCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/home/settings.controller.js');
                    }]
                }
            })
            // Change Password
            .state('changePassword', {
                url: '/changePassword',
                cache: false,
                templateUrl: 'modules/patients/changePassword.html',
                controller : 'changePasswordCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/changePassword.controller.js');
                    }]
                }
            })
            .state('specialityType', {
                url: '/specialityType',
                cache: false,
                templateUrl: 'modules/appointment/specialityType.html',
                controller : 'specialityTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/specialityType.controller.js');
                    }]
                }
            })
            .state('doctorList', {
                url: '/doctorList/:specialityId',
                cache: false,
                templateUrl: 'modules/appointment/doctorList.html',
                controller : 'doctorListCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/doctorList.controller.js');
                    }]
                }
            })
            .state('doctorSearchList', {
                url: '/doctorSearchList/:keywords',
                cache: false,
                templateUrl: 'modules/appointment/doctorSearchList.html',
                controller : 'doctorSearchListCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/doctorSearchList.controller.js');
                    }]
                }
            })
            .state('bookAppointment', {
                url: '/bookAppointment/:userId',
                cache: false,
                templateUrl: 'modules/appointment/bookAppointment.html',
                controller : 'bookAppointmentCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/bookAppointment.controller.js');
                    }]
                }
            })
            .state('viewAppointDetails', {
                url: '/viewAppointDetails',
                cache: false,
                templateUrl: 'modules/appointment/viewAppointDetails.html',
                controller : 'viewAppointDetailsCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/viewAppointDetails.controller.js');
                    }]
                }
            })
            .state('historySchedule', {
                url: '/historySchedule',
                cache: false,
                templateUrl: 'modules/appointment/historySchedule.html',
                controller : 'historyScheduleCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/historySchedule.controller.js');
                    }]
                }
            })
            // Doctor Update Data
            .state('updateData', {
                url: '/updateData',
                cache: false,
                templateUrl: 'modules/patients/updateData.html',
                controller : 'updateDataCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/updateData.controller.js');
                    }]
                }
            })
            .state('dashboardPatientAppointment', {
                url: '/dashboardPatientAppointment',
                cache: false,
                templateUrl: 'modules/patients/dashboardPatientAppointment.html',
                controller : 'dashboardPatientAppointmentCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/dashboardPatientAppointment.controller.js');
                    }]
                }
            })
            .state('viewRoom', {
                url: '/viewRoom',
                cache: false,
                templateUrl: 'modules/admitPatient/viewRoom.html',
                controller : 'viewRoomCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/viewRoom.controller.js');
                    }]
                }
            })
            .state('viewRoomStatus', {
                url: '/viewRoomStatus/:userId',
                cache: false,
                templateUrl: 'modules/admitPatient/viewRoomStatus.html',
                controller : 'viewRoomStatusCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/viewRoomStatus.controller.js');
                    }]
                }
            })
            .state('app.help', {
                url: '/help',
                cache: false,
                views: {
                    'mainContent': {
                        templateUrl: 'modules/help/help.html',
                        controller : 'HelpCtrl'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name : 'HelpModule',
                            files: [
                                'modules/help/help.controller.js',
                                'modules/help/help.service.js'
                            ]
                        });
                    }]
                }
            })
            .state('emergencyNo', {
                url: '/emergencyNo',
                cache: false,
                templateUrl: 'modules/help/emergencyNo.html',
                // controller : 'dashboardPatientAppointmentCtrl',
                resolve: {
                    isLoggedIn : authStatus() //,
                    // loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    //     return $ocLazyLoad.load('modules/patients/dashboardPatientAppointment.controller.js');
                    // }]
                }
            })
            .state('app.helpdetails', {
                url: '/help/:id',
                cache: false,
                views: {
                    'mainContent': {
                        templateUrl: 'modules/help/help_details.html',
                        controller : 'HelpDetailsCtrl'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name : 'HelpModule',
                            files: [
                                'modules/help/help.controller.js',
                                'modules/help/help.service.js'
                            ]
                        });
                    }]//,
                    // status: authStatus
                }
            })        
	        // 'app.orders', 'app.account', 'app.setting'
	        // if none of the above states are matched, use this as the fallback
	   		$urlRouterProvider.otherwise('/app');


        /**
         * [authStatus Check authentication status of app]
         * @return {Promise Object}  [Promise either resolve or reject]
         */
    }]);
   	/**
   	 * [appWalkThrough application intro walk through]
   	 */
	function appWalkThrough($scope, $state, $ionicSlideBoxDelegate, $location, GeoLocation, $mdDialog, $localStorage){
		var imagePath = 'assets/images/60.jpeg';
            $scope.slides = [
                {image: imagePath, description: 'Image 00'},
                {image: imagePath, description: 'Image 01'},
                {image: imagePath, description: 'Image 02'},
                {image: imagePath, description: 'Image 03'},
                {image: imagePath, description: 'Image 04'}
            ];
        // Next slide 
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        // Previous slide
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
        // Redirect to add address page
        $scope.gotoAddress = function(){
        	$state.go('app.address');
        };
        // Get your location by GPS
        $scope.getLocation = function(){
            GeoLocation.getAddress(function(err, location){
            	if(err){
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Sorry!!!')
                        .textContent(err)
                        .ariaLabel('Alert')
                        .ok('Got it!')
                    );
            	}else{
            		$state.go('app.home', {'location': location});
            	}
            });
        };
    }
    
    var authStatus = function(){
    return ['$q', '$location', '$timeout', '$rootScope', '$localStorage','AuthService','$state', function ($q, $location, $timeout, $rootScope, $localStorage, AuthService, $state) {

    // return function($q, $timeout, AuthService, $state, $rootScope, $scope, $location, $localStorage) {
            var deferred = $q.defer();
            // // Make an AJAX call to check if the user is logged in
            // AuthService.me().get({'type':'status'}, function (res){
            // 	if(res.code != 401){
            //         $scope.showHeader = true;
            // 		$timeout(deferred.resolve, 0);
            //         // $location.url('/login')
            // 	}else{
            //         $scope.showHeader = false;
            //         $location.url('/login');
            //         $timeout(deferred.resolve, 0);
            //         // $location.url('/login')
            //         // $state.go('app.address');
            // 	}
            //     return deferred.promise;
            // });
            if($localStorage && $localStorage.User && ($localStorage.User.token != null || $localStorage.User.token != undefined)) {
                $rootScope.showHeader = true;
                if($location.path()=='/login' || $location.path()=='/signup'){
                    $location.url('/app')
                }
                deferred.resolve(true);
                // return deferred.promise;
            } else{
                $rootScope.showHeader = false;
                $location.url('/login');
                deferred.resolve(false);
                // return deferred.promise;
            }
            return deferred.promise;
        }] 
    };

    // var authStatus = function () {
    //     return ['$q', '$location', '$timeout', '$http','$rootScope','$localStorage', function ($q, $location, $timeout, $http,$rootScope,$localStorage) {
    //             var deferred = $q.defer();
    //             if($localStorage && $localStorage.User && ($localStorage.User.token != null || $localStorage.User.token != undefined)) {
    //                 console.log("from checkLoggedin");
    //                 $rootScope.showHeader = true;
    //                 if($localStorage.User.user_type_id)
    //                   deferred.resolve(true);
    //                 else{
    //                   deferred.resolve(false);
    //                   $location.url('/login');
    //                 }
    //                 // $location.url('/app');                           

    //                 $timeout(deferred.resolve, 0);
    //                 // deferred.resolve(true);
    //             }else{
    //                 $rootScope.showHeader = false;

    //                 console.log("from checkLoggedin else",$localStorage.User) 
    //                 $location.url('/login');
    //                 $timeout(deferred.resolve, 0);

    //                 // deferred.resolve(false);
    //             }
    //             return deferred.promise;
    //         }];
    // };

})();