//
angular.module('angugrails.controllers').
    controller('LogoutCtrl',function LogoutController($scope, $state, $log, WebService) {


        $scope.logout = function () {
            WebService.logout().then(
                function () {
                    $state.go('login');
                },
                function () {
                    $state.go('login');
                }
            )
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'logout', {
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/delete.html', controller: 'LogoutCtrl'}
                }
            });
    }]);
