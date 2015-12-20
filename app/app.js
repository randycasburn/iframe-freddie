(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.Iframe',
        'myApp.version'
    ]).
        config(['$locationProvider','$routeProvider', function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when('/', { template:'<h5>Landing Page</h5>'})
            $routeProvider.otherwise({redirectTo: '/'});
        }]);

})();
