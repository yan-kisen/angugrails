
angular.module('angugrails.controllers').
	controller('HomeCtrl', function ($scope, $log, $state, WebService) {
      $scope.reset = function() {
          $log.debug("In scope.reset for home controller.");
      }




      $scope.reset();
	
	}).config(['$stateProvider', function( $stateProvider ) {
		$stateProvider.state( 'home', {
			url: '/',
            views: {
                "navigation": { templateUrl:  '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl' },
                "content": { templateUrl: '/angugrails/ng-views/home.html', controller: 'HomeCtrl' }
            }
		});
	}]).
	config(['$urlRouterProvider', function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
    }]);
