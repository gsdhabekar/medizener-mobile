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
        });
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
            .state('addressType', {
                url: '/addressType',
                cache: false,
                templateUrl: 'modules/main/addressType.html',
                controller : 'addressTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/main/addressType.controller.js');
                    }]
                }
            })
            .state('appointmentList', {
                url: '/appointmentList',
                cache: false,
                templateUrl: 'modules/patients/appointmentList.html',
                controller : 'appointmentListCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/appointmentList.controller.js');
                    }]
                }
            })
            .state('onlineAppointType', {
                url: '/onlineAppointType',
                cache: false,
                templateUrl: 'modules/appointment/onlineAppointType.html',
                controller : 'onlineAppointTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/onlineAppointType.controller.js');
                    }]
                }
            })
            .state('appointmentCancel', {
                url: '/appointmentCancel',
                cache: false,
                templateUrl: 'modules/patients/appointmentCancel.html',
                controller : 'appointmentCancelCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/appointmentCancel.controller.js');
                    }]
                }
            })
            .state('addAppPatient', {
                url: '/addAppPatient',
                cache: false,
                templateUrl: 'modules/patients/addAppPatient.html',
                controller : 'addAppPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/addAppPatient.controller.js');
                    }]
                }
            })
            .state('appointmentPatient', {
                url: '/appointmentPatient/:userId',
                cache: false,
                templateUrl: 'modules/patients/appointmentPatient.html',
                controller : 'appointmentPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/appointmentPatient.controller.js');
                    }]
                }
            })
            .state('patientSearchList', {
                url: '/patientSearchList/:keywords',
                cache: false,
                templateUrl: 'modules/appointment/patientSearchList.html',
                controller : 'patientSearchListCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/patientSearchList.controller.js');
                    }]
                }
            })
            .state('viewPatientDetail', {
                url: '/viewPatientDetail/:userId/:appointId',
                cache: false,
                templateUrl: 'modules/appointment/viewPatientDetail.html',
                controller : 'viewPatientDetailCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/viewPatientDetail.controller.js');
                    }]
                }
            })
            .state('historyPatient', {
                url: '/historyPatient',
                cache: false,
                templateUrl: 'modules/appointment/historyPatient.html',
                controller : 'historyPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/historyPatient.controller.js');
                    }]
                }
            })
            .state('addPrescription', {
                url: '/addPrescription/:userId/:appointId',
                cache: false,
                templateUrl: 'modules/appointment/addPrescription.html',
                controller : 'addPrescriptionCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/addPrescription.controller.js');
                    }]
                }
            })
            // Appointment Related List
            .state('AppointmentType', {
                url: '/AppointmentType',
                cache: false,
                templateUrl: 'modules/appointment/AppointmentType.html',
                controller : 'AppointmentTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/AppointmentType.controller.js');
                    }]
                }
            })
            .state('editAppointmentType', {
                url: '/editAppointmentType/:patientType',
                cache: false,
                templateUrl: 'modules/appointment/editAppointmentType.html',
                controller : 'editAppointmentTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/editAppointmentType.controller.js');
                    }]
                }
            })
            .state('viewAppointmentType', {
                url: '/viewAppointmentType/:patientType',
                cache: false,
                templateUrl: 'modules/appointment/viewAppointmentType.html',
                controller : 'viewAppointmentTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/appointment/viewAppointmentType.controller.js');
                    }]
                }
            })
            .state('patientInfo', {
                url: '/patientInfo/:userId',
                cache: false,
                templateUrl: 'modules/patients/patientInfo.html',
                controller : 'patientInfoCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/patientInfo.controller.js');
                    }]
                }
            })
            .state('patientData', {
                url: '/patientData/:userId',
                cache: false,
                templateUrl: 'modules/patients/patientData.html',
                controller : 'patientDataCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/patientData.controller.js');
                    }]
                }
            })
            .state('patientAddPrescription', {
                url: '/patientAddPrescription/:userId',
                cache: false,
                templateUrl: 'modules/patients/patientAddPrescription.html',
                controller : 'patientAddPrescriptionCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/patientAddPrescription.controller.js');
                    }]
                }
            })
            .state('addStaff', {
                url: '/addStaff',
                cache: false,
                templateUrl: 'modules/patients/addStaff.html',
                controller : 'addStaffCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/addStaff.controller.js');
                    }]
                }
            })
            .state('editStaff', {
                url: '/editStaff/:userId',
                cache: false,
                templateUrl: 'modules/patients/editStaff.html',
                controller : 'editStaffCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/editStaff.controller.js');
                    }]
                }
            })
            .state('viewStaff', {
                url: '/viewStaff',
                cache: false,
                templateUrl: 'modules/patients/viewStaff.html',
                controller : 'viewStaffCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/viewStaff.controller.js');
                    }]
                }
            })
            .state('individualViewStaff', {
                url: '/individualViewStaff/:userId',
                cache: false,
                templateUrl: 'modules/patients/individualViewStaff.html',
                controller : 'individualViewStaffCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/individualViewStaff.controller.js');
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
            .state('certificateUpdate', {
                url: '/certificateUpdate',
                cache: false,
                templateUrl: 'modules/patients/certificateUpdate.html',
                controller : 'certificateUpdateCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/certificateUpdate.controller.js');
                    }]
                }
            })
            .state('feesUpdate', {
                url: '/feesUpdate',
                cache: false,
                templateUrl: 'modules/patients/feesUpdate.html',
                controller : 'feesUpdateCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/feesUpdate.controller.js');
                    }]
                }
            })
            // Patient Appointment Request
            .state('patientType', {
                url: '/patientType',
                cache: false,
                templateUrl: 'modules/patients/patientType.html',
                controller : 'patientTypeCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/patientType.controller.js');
                    }]
                }
            })
            .state('addAppointmentPatient', {
                url: '/addAppointmentPatient',
                cache: false,
                templateUrl: 'modules/patients/addAppointmentPatient.html',
                controller : 'addAppointmentPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/addAppointmentPatient.controller.js');
                    }]
                }
            })
            .state('editAppointmentPatient', {
                url: '/editAppointmentPatient/:userId',
                cache: false,
                templateUrl: 'modules/patients/editAppointmentPatient.html',
                controller : 'editAppointmentPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/editAppointmentPatient.controller.js');
                    }]
                }
            })
            .state('viewAppointmentPatient', {
                url: '/viewAppointmentPatient',
                cache: false,
                templateUrl: 'modules/patients/viewAppointmentPatient.html',
                controller : 'viewAppointmentPatientCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/patients/viewAppointmentPatient.controller.js');
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
            .state('addRoom', {
                url: '/addRoom',
                cache: false,
                templateUrl: 'modules/admitPatient/addRoom.html',
                controller : 'addRoomCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/addRoom.controller.js');
                    }]
                }
            })
            .state('editRoom', {
                url: '/editRoom/:roomId',
                cache: false,
                templateUrl: 'modules/admitPatient/editRoom.html',
                controller : 'editRoomCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/editRoom.controller.js');
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
            .state('roomPatientBooked', {
                url: '/roomPatientBooked/:roomId/:bedId/:userId/:appointId',
                cache: false,
                templateUrl: 'modules/admitPatient/roomPatientBooked.html',
                controller : 'roomPatientBookedCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/roomPatientBooked.controller.js');
                    }]
                }
            })
            .state('appointmentSuccess', {
                url: '/appointmentSuccess/:roomId/:bedId/:flag',
                cache: false,
                templateUrl: 'modules/admitPatient/appointmentSuccess.html',
                controller : 'appointmentSuccessCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/admitPatient/appointmentSuccess.controller.js');
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
				    }],
				    isLoggedIn : authStatus(),
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
				    }]
				}
	        })
            .state('settings', {
                url: '/settings',
                cache: false,
                templateUrl: 'modules/help/settings.html',
                controller : 'settingsCtrl',
                resolve: {
                    isLoggedIn : authStatus(),
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('modules/help/settings.controller.js');
                    }]
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
                console.log("localStorage session true")
                // alert("called")
                $rootScope.showHeader = true;
                // $state.go('app')
                console.log($location.path())
                if($location.path()=='/login' || $location.path()=='/signup'){
                    $location.url('/app')
                }
                deferred.resolve(true);
                // return deferred.promise;
            } else{
                console.log("localStorage session false false")
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