(function(){
	'use strict';

	var app = angular.module('main.controller', []);

    app.controller('addressTypeCtrl', ['$scope','$mdSidenav','$state','$http','$URL','$rootScope','$mdDialog','UserServices','$localStorage','formlyConfig','$cordovaDatePicker', function ($scope, $mdSidenav, $state, $http, $URL, $rootScope, $mdDialog, UserServices, $localStorage, formlyConfig, $cordovaDatePicker) {
        var Id = $localStorage.User.id;
        $scope.user = {};
        // UserServices.getInfo().get({id:Id,field:'first_name,last_name,phone_number,email,gender,dob,blood_group,specification,profile'},function(result){
        //   if(result.code==200){
        //     console.log(result.data)
        //     $scope.user = result.data;
        //   } else{

        //   }
        // });

        $scope.Address = [
            {type:"home",_id:1},
            {type:"clinic",_id:2},
            {type:"office",_id:3},
            {type:"hospital",_id:4},
            {type:"other",_id:5}];

        $scope.addressType = function(res){
          console.log(res.address_type)
          // $scope.user  = {};
          UserServices.getInfo().get({id:Id,field:'address'},function(result){
            if(result.code==200){
              $scope.user = result.data.address.filter(function (address) {
                return address.address_type == res.address_type;
              }).pop();
              if(!$scope.user){
                $scope.user = {};
                $scope.user['address_type'] = res.address_type;
              }
            } else{

            }
          })
        }
        $scope.update = function(user,ev){
          console.log(user)

          var user  ={
            address1: user.address1,
            address2: user.address2,
            city: user.city,
            postal_code: user.postal_code,
            state: user.state,
            status: user.status,
            address_type: user.address_type,
            subtype: user._id?'update':'add',
            subId: user._id
          }
          console.log(user)

          UserServices.update().update({id:Id,query:'(type=doctor)',action:'address'},user,function(result){
            if(result.code==200){
              console.log(result.message);
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Success!')
                  .content(result.message)
                  .ok('Nice')
                  .targetEvent(ev)
              );
            }else{
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
        }
        
    }]);
})();