angular.module("polakApp",[
	//external libraries
	'ngRoute', 
	'ngAnimate',
  'pascalprecht.translate',
  'ui.bootstrap',
	//internal libraries
  'headersApp',
	'automatApp',
	'expressionApp'
	])


.config(['$routeProvider', '$locationProvider', '$translateProvider',
  function($routeProvider, $locationProvider, $translateProvider) {
    $routeProvider
      .when('/exercise1', {
        templateUrl: 'exercise1/zad1.html',
        controller: 'automatCtrl'
      })
      .when('/exercise2', {
        templateUrl: 'exercise2/zad2.html',
        controller: 'expressionCtrl'
      });


    $translateProvider.useStaticFilesLoader({
    prefix: 'lib/lang/locale-',
    suffix: '.json'
    });

    $translateProvider.use('en_US');
    $translateProvider.useSanitizeValueStrategy('escape');

    //$locationProvider.html5Mode(true);
}])