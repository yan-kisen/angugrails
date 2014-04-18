//
angular.module('angugrails.controllers').
    controller('LoginCtrl',function LoginController($scope, $state, $log, WebService) {

        $scope.reset = function () {
            $scope.credentials = {username: '', password: '' };
            $scope.errorMessage = '';
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
            if ($scope.loginForm.$valid) {
                return WebService.login($scope.credentials.username, $scope.credentials.password).
                    then(function (param) {
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
            'login', {
                noAuthRequired: true,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controllers: 'NavigationCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/sessions/new.html', controller: 'LoginCtrl'}
                }
            });
    }]);
