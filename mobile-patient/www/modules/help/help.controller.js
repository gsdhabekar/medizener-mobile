(function(){
	'use strict';

	var app = angular.module('help.controller', []);

	// Help controller
	app.controller('HelpCtrl', ['$scope','$state','Help', function ($scope, $state, Help) {
		$scope.helps = [];
                // Get all faq details
                $scope.getFAQs = function(){
                	Help.help().get({field:'title'},function(res){
                		if(res.code !== 401){
                			$scope.helps = res.data;
                		}else{
                			$scope.helps = [];
                		}
                	});
                }();
	}]);

	// Help Details controller
	app.controller('HelpDetailsCtrl', ['$scope','$stateParams','Help', function ($scope, $stateParams, Help) {
		$scope.help = {};
		// Get all faq details
                $scope.getFAQDetails = function(){
                	Help.help().get({'id': $stateParams.id }, function(res){
                		if(res.code !== 401){
                			$scope.help = res.data;
                		}else{
                			$scope.help = [];
                		}
                	});
                }();
	}]);
})();