//
angular.module('angugrails.controllers').
    controller('LogoutCtrl',function LogoutController($scope, $state, $log, WebService, AlertService) {


        $scope.logout = function () {
            AlertService.reset();
            WebService.logout().then(
                function () {
                    $state.go('login');
                    AlertService.passed("STATUS_LOGGED_OUT");
                },
                function () {
                    $state.go('login');
                    AlertService.passed("STATUS_LOGGED_OUT");
                }
            )
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'logout', {
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "alert": { templateUrl: '/angugrails/ng-views/alert.html', controller: 'AlertCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/delete.html', controller: 'LogoutCtrl'}
                }
            });
    }]);
