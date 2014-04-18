//
angular.module('angugrails.controllers').
    controller('RegisterCtrl',function RegisterController($scope, $state, $log, WebService) {

        $scope.reset = function () {
            $scope.registration = {username: null, email: null, password: null, passwordConfirm: null};
            $scope.errorMessage = "";
            $scope.submitted = false;
        };

        $scope.reset();

        $scope.register = function () {
            $('input').checkAndTriggerAutoFillEvent();
            $scope.errorMessage = "";
            $scope.submitted = true;
            if ($scope.registerForm.$valid) {
                return WebService.register($scope.registration.username,
                        $scope.registration.email,
                        $scope.registration.password).
                    then(function () {
                        $state.go('home');
                    }, function (response) {
                        $scope.errorMessage = response.description;
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
