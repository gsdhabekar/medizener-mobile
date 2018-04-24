(function() {

    'use strict';

    // Initiate location services
    var app = angular.module('common.service', ['ngResource']);

    // Location services 
    app.factory('GeoLocation', function ($cordovaGeolocation) {
        return {
            getAddress: function(callback){
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        var latlng = new google.maps.LatLng(lat, long);
                        var geocoder = geocoder = new google.maps.Geocoder();
                        // Reverse geocoding to get address from lat lng
                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results && results.length !== 0) {
                                    var address = results[0].formatted_address;
                                    var value = address.split(",");
                                    var count = value.length;
                                    var country = value[count - 1].trim();
                                    var state = value[count - 2].trim();
                                    var city = value[count - 3].trim();
                                    var location = value[count - 4].trim();
                                    callback(null, location);
                                }
                            }
                        });
                    }, function(err) {
                        callback('Unable to get your location.');
                    });
            }
        };
    });    
    app.filter('titleCase', function() {
        return function(input) {
          input = input || '';
          return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    });
    // Authentication service
    app.factory('AuthService', ['$resource','$URL', function ($resource,$URL){
        return {
            me: function(){
                return $resource($URL + '/authenticate/me');
            },
            authorize: function(){
                return $resource($URL + '/authenticate');
            }
        };
    }])
    // User service
    app.factory('UserServices', ['$resource','$URL', function ($resource,$URL){
        return {
            signup: function(){
                return $resource($URL + '/users');
            },
            login: function(){
                return $resource($URL + '/authenticate');
            },
            getInfo: function(){
                return $resource($URL+ '/users/:id',null)
            },
            remove: function(){
                return $resource($URL+ '/users/:id',null)
            },
            get: function(){
                return $resource($URL+ '/users',null)
            },
            update: function(){
                return $resource($URL + '/users/:id',null,{
                    'update': {method: 'PUT'}
                });
            }
        };
    }])
    // appointment service
    app.factory('AppointmentServices', ['$resource','$URL', function ($resource,$URL){
        return {
            savePost: function(){
                return $resource($URL + '/appointments');
            },
            getInfo: function(){
                return $resource($URL+ '/appointments/:id',null)
            },
            remove: function(){
                return $resource($URL+ '/appointments/:id',null)
            },
            get: function(){
                return $resource($URL+ '/appointments',null)
            },
            update: function(){
                return $resource($URL + '/appointments/:id',null,{
                    'update': {method: 'PUT'}
                });
            }
        };
    }])
    // room service
    app.factory('RoomServices', ['$resource','$URL', function ($resource,$URL){
        return {
            savePost: function(){
                return $resource($URL + '/rooms');
            },
            getInfo: function(){
                return $resource($URL+ '/rooms/:id',null)
            },
            remove: function(){
                return $resource($URL+ '/rooms/:id',null)
            },
            get: function(){
                return $resource($URL+ '/rooms',null)
            },
            update: function(){
                return $resource($URL + '/rooms/:id',null,{
                    'update': {method: 'PUT'}
                });
            }
        };
    }])
    // settings service
    app.factory('SettingServices', ['$resource','$URL', function ($resource,$URL){
        return {
            savePost: function(){
                return $resource($URL + '/settings');
            },
            getInfo: function(){
                return $resource($URL+ '/settings/:id',null)
            },
            remove: function(){
                return $resource($URL+ '/settings/:id',null)
            },
            get: function(){
                return $resource($URL+ '/settings',null)
            },
            update: function(){
                return $resource($URL + '/settings/:id',null,{
                    'update': {method: 'PUT'}
                });
            }
        };
    }])
    // search service
    app.factory('SearchServices', ['$resource','$URL', function ($resource,$URL){
        return {
            search: function(){
                return $resource($URL+ '/searchs',null)
            }
        };
    }])
    // components service
    app.factory('ComponentsServices', ['$resource','$URL', function ($resource,$URL){
        return {
            savePost: function(){
                return $resource($URL + '/components');
            },
            getInfo: function(){
                return $resource($URL+ '/components/:id',null)
            },
            remove: function(){
                return $resource($URL+ '/components/:id',null)
            },
            get: function(){
                return $resource($URL+ '/components',null)
            },
            update: function(){
                return $resource($URL + '/components/:id',null,{
                    'update': {method: 'PUT'}
                });
            }
        };
    }])
})();