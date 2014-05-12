//
angular.module('angugrails.controllers').
    controller('LoginCtrl',function LoginController($scope, $state, $log, WebService, AlertService) {

        $scope.reset = function () {
            $scope.username = '';
            $scope.password = '' ;
            $scope.errors = {};
            $scope.isAuthenticated = WebService.isAuthenticated;
        };

        $scope.reset();


        $scope.$watch(function () {
            return WebService.isAuthenticated;
        }, function (isAuthenticated) {
            $scope.isAuthenticated = isAuthenticated;
        });


        $scope.login = function () {
            $('input').checkAndTriggerAutoFillEvent();  // is this the right place for this?
            $scope.errorMessage = '';
            $scope.submitted = true;
            AlertService.reset();
            if ($scope.loginForm.$valid) {
                return WebService.login($scope.username, $scope.password).
                    then(function (param) {
                        $state.go('home');
                        AlertService.passed('STATUS_LOGGED_IN');
                    }, function (response) {
                        var error;
                        AlertService.failed(response.description);
                        for (var i =0; i < response.errors.length; i++) {
                            error = response.errors[i];
                            $scope.errors[error.field] = error.message;
                        }
                    });
            } else {
                AlertService.failed("INVALID_FORM");
            }
        };

    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'login', {
                noAuthRequired: true,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controllers: 'NavigationCtrl'},
                    "alert": { templateUrl: '/angugrails/ng-views/alert.html', controller: 'AlertCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/new.html', controller: 'LoginCtrl'}
                }
            });
    }]);
