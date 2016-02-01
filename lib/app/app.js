angular.module("polakApp",[
	//external libraries
	'ngRoute', 
	'ngAnimate',
	//internal libraries
	'automatApp',
	'expressionApp'
	])


.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/exercise1', {
        templateUrl: 'exercise1/zad1.html',
        controller: 'automatCtrl'
      })
      .when('/exercise2', {
        templateUrl: 'exercise2/zad2.html',
        controller: 'expressionCtrl'
      });

    //$locationProvider.html5Mode(true);
}])