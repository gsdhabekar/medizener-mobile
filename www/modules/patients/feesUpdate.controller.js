(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('feesUpdateCtrl', ['$scope','$mdSidenav','$state','$rootScope','UserServices','$localStorage','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, UserServices, $localStorage, $mdDialog) {

    $scope.hideButton = $rootScope.isActive;
  	
    var Id = $localStorage.User.id;
    UserServices.getInfo().get({id:Id,field:'home_facility,fees'},function(result){
      if(result.code==200){
        console.log(result.data)
        $scope.user = result.data;
        if(result.data.fees &&result.data.fees.length>0 ){
          var home_facility_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'home_facility_fees';}).pop();
          $scope.user.home_facility_fees = home_facility_fees.price;

          var patient_friendly_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'patient_friendly_fees';}).pop();
          $scope.user.patient_friendly_fees = patient_friendly_fees.price;

          var follow_up_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'follow_up_fees';}).pop();
          $scope.user.follow_up_fees = follow_up_fees.price;

          var emergency_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'emergency_fees';}).pop();
          $scope.user.emergency_fees = emergency_fees.price;

          var audio_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'audio_fees';}).pop();
          $scope.user.audio_fees = audio_fees.price;

          var video_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'video_fees';}).pop();
          $scope.user.video_fees = video_fees.price;

          var hospital_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'hospital_fees';}).pop();
          $scope.user.hospital_fees = hospital_fees.price;
        }
      } else{

      }
    })

    $scope.home_Facility = [{ flag: true}, {flag:false}]

    $scope.update = function(user, ev){
      console.log(user)
      var data = {
        home_facility: user.home_facility,
        fees:[  { type:'hospital_fees', price: user.hospital_fees},
                { type:'patient_friendly_fees', price: user.patient_friendly_fees},
                { type:'follow_up_fees', price: user.follow_up_fees},
                { type:'emergency_fees', price: user.emergency_fees},
                { type:'audio_fees', price: user.audio_fees},
                { type:'video_fees', price: user.video_fees},
                { type:'home_facility_fees', price: user.home_facility_fees}]
      };

      UserServices.update().update({id:user._id,query:'(type=doctor)',action:'all'},data,function(result){
        if(result.code==200){
          console.log(result.message);
          $state.go('app');
          $mdDialog.show(
            $mdDialog.alert()
              .title('Success!')
              .content(result.message)
              .ok('Nice')
              .targetEvent(ev)
          );
        } else{
          console.log(result.message);
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error!')
              .content(result.message)
              .ok('Error')
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