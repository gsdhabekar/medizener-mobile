(function() {

    'use strict';

    // Initiate home services
    var app = angular.module('home.service', ['ngResource']);

    // Home services 
    app.factory('Home', function ($resource, $URL) {
        return {
            restaurants: function(){
                return $resource($URL + '/restaurants');
            }
        };
    });    
})();