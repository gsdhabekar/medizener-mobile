(function(){
	'use strict';

	var app = angular.module('main.controller', []);

	// Main app controller
	app.controller('appointmentPatientCtrl', ['$scope','$mdSidenav','$state','$rootScope','$localStorage','UserServices','AppointmentServices','$mdDialog', function ($scope, $mdSidenav, $state, $rootScope, $localStorage, UserServices, AppointmentServices,  $mdDialog) {
    
    var Id = $localStorage.User.id;
    $scope.bookedFlag = false;
    $scope.bookedConsultFlag = false;
    UserServices.getInfo().get({id:Id,field:'available_time,interval_time,address,fees'},function(result){
      if(result.code==200){
        $scope.users = result.data;
        $scope.doctorAddress = result.data.address;
        $scope.interval_time = result.data.interval_time;
        if(result.data.available_time){

          $scope.hospital_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'hospital_fees';}).pop();
          $scope.patient_friendly_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'patient_friendly_fees';}).pop();
          $scope.follow_up_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'follow_up_fees';}).pop();
          $scope.audio_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'audio_fees';}).pop();
          $scope.video_fees = result.data.fees.filter(function (fee) {
            return fee.type === 'video_fees';}).pop();
          
          var morningTime = $scope.morningTime  = result.data.available_time.filter(function (time) {
            return time.type === 'Morning';}).pop();
          var addressMorning = result.data.address.filter(function (add) {
            return add.address_type === $scope.morningTime.address_type;}).pop();
          morningTime['address1']   = $scope.morningTime['address1']    = addressMorning.address1;
          morningTime['address2']   = $scope.morningTime['address2']    = addressMorning.address2;
          morningTime['city']       = $scope.morningTime['city']        = addressMorning.city;
          morningTime['state']      = $scope.morningTime['state']       = addressMorning.state;
          morningTime['postal_code']= $scope.morningTime['postal_code'] = addressMorning.postal_code;

          var regularTime = $scope.regularTime  = result.data.available_time.filter(function (time) {
            return time.type === 'Regular';}).pop();
          var addressRegular = result.data.address.filter(function (add) {
            return add.address_type === $scope.regularTime.address_type;}).pop();
          regularTime['address1']   = $scope.regularTime['address1']    = addressRegular.address1;
          regularTime['address2']   = $scope.regularTime['address2']    = addressRegular.address2;
          regularTime['city']       = $scope.regularTime['city']        = addressRegular.city;
          regularTime['state']      = $scope.regularTime['state']       = addressRegular.state;
          regularTime['postal_code']= $scope.regularTime['postal_code'] = addressRegular.postal_code;

          var eveningTime = $scope.eveningTime  = result.data.available_time.filter(function (time) {
            return time.type === 'Evening';}).pop();
          var addressEvening = result.data.address.filter(function (add) {
            return add.address_type === $scope.eveningTime.address_type;}).pop();
          eveningTime['address1']   = $scope.eveningTime['address1']    = addressEvening.address1;
          eveningTime['address2']   = $scope.eveningTime['address2']    = addressEvening.address2;
          eveningTime['city']       = $scope.eveningTime['city']        = addressEvening.city;
          eveningTime['state']      = $scope.eveningTime['state']       = addressEvening.state;
          eveningTime['postal_code']= $scope.eveningTime['postal_code'] = addressEvening.postal_code;

          var online_ConsultantTime = $scope.online_ConsultantTime  = result.data.available_time.filter(function (time) {
            return time.type === 'Online_Consultant';}).pop();
          var addressOnlineConsultant = result.data.address.filter(function (add) {
            return add.address_type === $scope.eveningTime.address_type;}).pop();
          online_ConsultantTime['address1']   = $scope.online_ConsultantTime['address1']    = addressOnlineConsultant.address1;
          online_ConsultantTime['address2']   = $scope.online_ConsultantTime['address2']    = addressOnlineConsultant.address2;
          online_ConsultantTime['city']       = $scope.online_ConsultantTime['city']        = addressOnlineConsultant.city;
          online_ConsultantTime['state']      = $scope.online_ConsultantTime['state']       = addressOnlineConsultant.state;
          online_ConsultantTime['postal_code']= $scope.online_ConsultantTime['postal_code'] = addressOnlineConsultant.postal_code;
        }  else{
          console.log("No available_time");
          $scope.noAvailable = true;
        }

      } else{

      }
    })

    $scope.current = function(date){
      // console.log($scope.morningTime)
      var currentDate = new Date();
      if(date){
        currentDate = date;
      }
      $scope.date = currentDate;
      $scope.displayDate = currentDate;
      var sDate = currentDate;
        sDate.setHours(0,0,0,0);
      var sTime = sDate.getTime();
      var eDate = currentDate;
        eDate.setHours(23,59,59,999);
      var eTime = eDate.getTime();

      var appDate = {$gte: Math.floor(sTime/1000),$lte: Math.floor(eTime/1000)}
      var query = '(doctor_id='+Id+',booked_status=true)';

      AppointmentServices.get().get({query: query},function(result){
        if(result.code==200){
          $scope.appointTime = [];
          result.data.forEach(function(data){
            $scope.appointTime.push(data.appointment_date);
          });
          appointmentStatus();
        } else{

        }
      })


      function appointmentStatus(){
        if($scope.morningTime){
          // Morning
          var date1 = new Date($scope.morningTime.start_time)
          var date2 = new Date($scope.morningTime.end_time)
          var hrs_Start = date1.getHours();
          var min_Start = date1.getMinutes();
          var hrs_End   = date2.getHours();
          var min_End   = date2.getMinutes();
          var startMrgTime = currentDate.setHours(hrs_Start,min_Start,0,0);
          var endMrgTime   = currentDate.setHours(hrs_End,min_End,0,0);
        } else{
          console.log("Morning time not available")
        }

        if($scope.regularTime){
          // Afternoon
          var date1 = new Date($scope.regularTime.start_time)
          var date2 = new Date($scope.regularTime.end_time)
          var hrs_Start = date1.getHours();
          var min_Start = date1.getMinutes();
          var hrs_End   = date2.getHours();
          var min_End   = date2.getMinutes();
          var startRegTime = currentDate.setHours(hrs_Start,min_Start,0,0);
          var endRegTime   = currentDate.setHours(hrs_End,min_End,0,0);
        } else{
          console.log("Regular time not available")
        }

        if($scope.eveningTime){
          // Afternoon
          var date1 = new Date($scope.eveningTime.start_time)
          var date2 = new Date($scope.eveningTime.end_time)
          var hrs_Start = date1.getHours();
          var min_Start = date1.getMinutes();
          var hrs_End   = date2.getHours();
          var min_End   = date2.getMinutes();
          var startEveTime = currentDate.setHours(hrs_Start,min_Start,0,0);
          var endEveTime   = currentDate.setHours(hrs_End,min_End,0,0);
        } else{
          console.log("Regular time not available")
        }

        if($scope.online_ConsultantTime){
          // Afternoon
          var date1 = new Date($scope.online_ConsultantTime.start_time)
          var date2 = new Date($scope.online_ConsultantTime.end_time)
          var hrs_Start = date1.getHours();
          var min_Start = date1.getMinutes();
          var hrs_End   = date2.getHours();
          var min_End   = date2.getMinutes();
          var startOnlConTime = currentDate.setHours(hrs_Start,min_Start,0,0);
          var endOnlConTime   = currentDate.setHours(hrs_End,min_End,0,0);
        } else{
          console.log("Regular time not available")
        }

        //Parse In
        var parseIn = function(date_time){
          var d = new Date(date_time);
          d.setSeconds(0);
          return d;
        }
        console.log($scope.appointTime)
        //make list
        var getTimeIntervals = function (time1, time2) {
          var arr = [];
          while(time1 < time2){
            var statusTime = new Date(time1);
              statusTime = statusTime.getTime();
              statusTime = Math.floor(statusTime/1000);
            console.log("statusTime")
            // console.log($scope.appointTime)
            var crtTime = new Date();
                crtTime = crtTime.getTime();
                crtTime = Math.floor(crtTime/1000);
            var status = $scope.appointTime.indexOf(statusTime)
            console.log(statusTime)
            if(statusTime<=crtTime){
              status = true;
            } else{
              status = status>-1?true:false;
            }
            arr.push({slot:time1.toTimeString().substring(0,5),time: new Date(time1),status:status});
            time1.setMinutes(time1.getMinutes() + $scope.interval_time);
          }
          return arr;
        }
        startMrgTime = parseIn(startMrgTime);
        endMrgTime   = parseIn(endMrgTime);
        $scope.morningTimes = getTimeIntervals(startMrgTime, endMrgTime);

        startRegTime = parseIn(startRegTime);
        endRegTime   = parseIn(endRegTime);
        $scope.regularTimes = getTimeIntervals(startRegTime, endRegTime);

        startEveTime = parseIn(startEveTime);
        endEveTime   = parseIn(endEveTime);
        $scope.eveningTimes = getTimeIntervals(startEveTime, endEveTime);

        startOnlConTime = parseIn(startOnlConTime);
        endOnlConTime   = parseIn(endOnlConTime);
        $scope.online_ConsultantTimes = getTimeIntervals(startOnlConTime, endOnlConTime);
      }
    };
    $scope.current();

    $scope.date = new Date();
    $scope.next = function(){
      $scope.date.setDate($scope.date.getDate() + 1)
      console.log($scope.date)
      $scope.current($scope.date);
    }

    $scope.previous = function(){
      var todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
      var compareDate = $scope.date;
          compareDate.setHours(0, 0, 0, 0);
      if(todayDate<compareDate){
        $scope.date.setDate($scope.date.getDate() - 1)
        console.log($scope.date)
        $scope.current($scope.date);
      }
    }

    $scope.feesUpdate = function(fees){
      $scope.selectFees = fees;
      console.log(fees)
      console.log($scope.selectFees.type)
    }

    $scope.calculateAge = function(birthday) { // pass in player.dateOfBirth
      var ageDifMs = Date.now() - new Date(birthday);
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    $scope.book = function(time, addType){
      $scope.bookTime = time;
      $scope.bookedFlag = true;
      var Id = $localStorage.User.id;
      UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'patient',field:'prefix,first_name,last_name,phone_number,email,gender,blood_group,dob,address'},function(result){
        if(result.code==200){
          $scope.user = result.data;
          $scope.add  = $scope.doctorAddress.filter(function (add) {
          return add.address_type === addType;}).pop();
        } else{

        }
      });
      console.log(time)
    }

    $scope.booked = function(time, addType){
      $scope.bookTime = time;
      $scope.bookedConsultFlag = true;
      // var Id = $localStorage.User.id;
      UserServices.getInfo().get({id:Id,access_id:$state.params.userId,access_type:'patient',field:'prefix,first_name,last_name,phone_number,email,gender,blood_group,dob,address'},function(result){
        if(result.code==200){
          console.log("=====result.data=====")
          console.log(result.data)
          $scope.user = result.data;
          $scope.add  = $scope.doctorAddress.filter(function (add) {
          return add.address_type === addType;}).pop();
        } else{

        }
      });
    }

    $scope.minDate = $scope.calenderDate = new Date();
    $scope.calenderChange = function(calender){
      $scope.current(calender);
    }
    $scope.bookAppFlag = true;
    $scope.bookApp = function(){
      $scope.bookAppFlag = !$scope.bookAppFlag;
    }

    $scope.submit = function(userId, time, details, ev){
      console.log(userId)
      console.log(time.time)
      var record = {
        type: $scope.selectFees.type,
        patient_id: userId,
        doctor_id: Id,
        priscriptions: details,
        interval_time: $scope.interval_time,
        appointment_date:time.time,
        fees: $scope.selectFees.price,
        status: false,
        booked_status: true
      }
      console.log(record);
      AppointmentServices.savePost().save(record,function(result){
        if(result.code==200){
          console.log(result.data);
          $scope.bookedFlag = false;
          $scope.bookedConsultFlag = false;
          $scope.current();
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
          $state.go('app');
        } else{
          console.log("error")
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

    $scope.editPatient = function(Id){
      $state.go('editAppointmentPatient',{userId:Id});
    }

    $scope.back = function(){
      $scope.bookedFlag = false;
      $scope.bookedConsultFlag = false;
    }

    $scope.viewPerPatient = function(Id){
      $state.go('patientData',{userId:Id});
    }

	}]);
})();