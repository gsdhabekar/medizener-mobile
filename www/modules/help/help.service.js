(function() {

    'use strict';

    // Initiate location services
    var app = angular.module('help.service', ['ngResource']);

    // Help services 
    app.factory('Help', function ($resource, $URL) {
        return {
            help: function(){
                return $resource($URL + '/helps/:id');
            }
        };
    });    
})();