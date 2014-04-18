//
angular.module('angugrails.controllers').
    controller('NavigationCtrl', function NavigationController($scope, $state, $log, WebService) {

        $scope.reset = function () {
            $scope.isAuthenticated = WebService.isAuthenticated;
            $scope.authUsername = WebService.authUsername;
            $scope.roles = WebService.roles;
        };

        $scope.reset();

        $scope.$watch(WebService.roles, function () {
            $scope.roles = WebService.roles;
        });

        $scope.$watch(function () {
            return WebService.getAuthUsername();
        }, function (authUsername) {
            $log.debug("setting authusername to ->" + WebService.authUsername);
            $scope.authUsername = WebService.getAuthUsername();
        });


        $scope.$watch(function () {
            return WebService.getIsAuthenticated();
        }, function (isAuthenticated) {
            $log.debug("in navigation watch, isAuthenticated is: " + isAuthenticated + ".");
            $scope.isAuthenticated = WebService.getIsAuthenticated();
        });
    });
