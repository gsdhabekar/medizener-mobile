(function(){
	'use strict';
	var app = angular.module('main.controller', []);
	// Main app controller
	app.controller('viewRoomCtrl', ['$scope','$mdSidenav','$state','$rootScope','RoomServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, RoomServices, $localStorage, $mdDialog) {
    var Id = $localStorage.User.id;
    $scope.viewStatus = function(){
      $state.go('viewRoomStatus',{userId: Id});
    }
	}]);
})();