// Material Theme Management
(function () {

  // Material theme app
  var app = angular.module('licliq.theme', []);

  // Material theme configuration
  app.config(["$mdThemingProvider", function ($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('app-theme', 'default')
      .primaryPalette('teal')
      .accentPalette('red', {
        'default': '900',
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      });
    $mdThemingProvider.theme('app-wht')
      .primaryPalette('grey');
  }]);
})();