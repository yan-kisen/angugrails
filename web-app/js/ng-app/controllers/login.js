//
angular.module('angugrails.controllers').
    controller('LoginCtrl',function LoginController($scope, $state, $log, WebService, FlashService) {

        $scope.reset = function () {
            $scope.username = '';
            $scope.password = '' ;
            $scope.errorMessage = '';
            $scope.errors = {};
            $scope.isAuthenticated = WebService.isAuthenticated;
            $scope.submitted = false;
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
            FlashService.setStatusCode("");
            if ($scope.loginForm.$valid) {
                return WebService.login($scope.username, $scope.password).
                    then(function (param) {
                        $state.go('home');
                        FlashService.setStatusCode('STATUS_LOGGED_IN');
                    }, function (response) {
                        var error;
                        $scope.errorMessage = response.description;
                        for (var i =0; i < response.errors.length; i++) {
                            error = response.errors[i];
                            $scope.errors[error.field] = error.message;
                        }
                    });
            } else {
                $scope.errorMessage = "INVALID_FORM";
            }
        };

    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'login', {
                noAuthRequired: true,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controllers: 'NavigationCtrl'},
                    "flash": { templateUrl: '/angugrails/ng-views/flash.html', controller: 'FlashCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/new.html', controller: 'LoginCtrl'}
                }
            });
    }]);
