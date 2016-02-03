var headersController = angular.module('headersApp', []);

headersController
	.controller('indexHeadersCtrl', ['$scope','$location', function ($scope, $location) {
		$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    	};
}]);