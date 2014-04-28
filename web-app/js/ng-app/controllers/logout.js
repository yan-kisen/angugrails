//
angular.module('angugrails.controllers').
    controller('LogoutCtrl',function LogoutController($scope, $state, $log, WebService, FlashService) {


        $scope.logout = function () {
            FlashService.setStatusCode("");
            WebService.logout().then(
                function () {
                    $state.go('login');
                    FlashService.setStatusCode("STATUS_LOGGED_OUT");
                },
                function () {
                    $state.go('login');
                    FlashService.setStatusCode("STATUS_LOGGED_OUT");
                }
            )
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'logout', {
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "flash": { templateUrl: '/angugrails/ng-views/flash.html', controller: 'FlashCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/delete.html', controller: 'LogoutCtrl'}
                }
            });
    }]);
