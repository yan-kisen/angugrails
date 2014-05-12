//
angular.module('angugrails.controllers').
    controller('RegisterCtrl',function RegisterController($scope, $state, $log, WebService, AlertService) {

        $scope.reset = function () {
            $scope.username = null;
            $scope.email = null;
            $scope.password = null;
            $scope.passwordConfirm = null;
            $scope.errors = {};

        };

        $scope.reset();

        $scope.register = function () {
            $('input').checkAndTriggerAutoFillEvent();
            $scope.errorMessage = "";
            AlertService.reset();
            if ($scope.registerForm.$valid) {
                return WebService.register($scope.username,
                        $scope.email,
                        $scope.password).
                    then(function () {
                        $state.go('home');
                        AlertService.passed('STATUS_REGISTERED');
                    }, function (response) {
                        var error;

                        AlertService.failed(response.description);
                        for (var i =0; i < response.errors.length; i++) {
                            error = response.errors[i];
                            $scope.errors[error.field] = error.message;
                        }
                        $scope.submitted = false;
                    });
            } else {
                AlertService.failed("INVALID_FORM");
            }
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'register', {
                noAuthRequired: true,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "alert": { templateUrl: '/angugrails/ng-views/alert.html', controller: 'AlertCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/registrations/new.html', controller: 'RegisterCtrl'}
                }
            });
    }]);
