//
angular.module('angugrails.controllers').
    controller('RegisterCtrl',function RegisterController($scope, $state, $log, WebService) {

        $scope.reset = function () {
            $scope.username = null;
            $scope.email = null;
            $scope.password = null;
            $scope.passwordConfirm = null;
            $scope.errorMessage = "";
            $scope.errors = {};
            $scope.submitted = false;

        };

        $scope.reset();

        $scope.register = function () {
            $('input').checkAndTriggerAutoFillEvent();
            $scope.errorMessage = "";
            $scope.submitted = true;
            if ($scope.registerForm.$valid) {
                return WebService.register($scope.username,
                        $scope.email,
                        $scope.password).
                    then(function () {
                        $state.go('home');
                    }, function (response) {
                        var error;

                        $scope.errorMessage = response.description;
                        for (var i =0; i < response.errors.length; i++) {
                            error = response.errors[i];
                            $scope.errors[error.field] = error.message;
                        }
                    });
            } else {
                $scope.errorMessage = "Please correct errors below.";
            }
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'register', {
                noAuthRequired: true,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/registrations/new.html', controller: 'RegisterCtrl'}
                }
            });
    }]);
