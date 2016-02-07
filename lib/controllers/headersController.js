var headersController = angular.module('headersApp', []);

headersController
	.controller('indexHeadersCtrl', ['$scope','$location', '$translate', function ($scope, $location, $translate) {

		$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    	};

    	$scope.switchLanguage = function (key) {
    	$translate.use(key);
  };
}]);