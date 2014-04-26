//
angular.module('angugrails.controllers').
    controller('PasswordCtrl',function PasswordController($scope, $state, $log, WebService) {

        $scope.reset = function () {
            $scope.password = null;
            $scope.newPassword = null;
            $scope.confirmNewPassword = null;
            $scope.errorMessage = "";
            $scope.errors = {};
            $scope.submitted = false;
            $scope.authUsername = WebService.getAuthUsername();
        };

        $scope.reset();

        $scope.changePassword = function () {
            $('input').checkAndTriggerAutoFillEvent();
            $scope.errorMessage = "";
            $scope.submitted = true;
            if ($scope.passwordForm.$valid) {
                $scope.errorMessage = "";
                $scope.errors['password'] = "";
                return WebService.changePassword($scope.password, $scope.newPassword).
                    then(function () {
                        $state.go('home');
                    }, function (response) {
                        $scope.errorMessage = response.description;
                        if (response.httpStatus === 403) {
                            $scope.errors['password'] = "Invalid Password.";
                        }
                    });
            } else {
                $scope.errorMessage = "Please correct errors below.";
            }
        };
    }).
    config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(
            'changePassword', {
                noAuthRequired: false,
                views: {
                    "navigation": { templateUrl: '/angugrails/ng-views/navigation.html', controller: 'NavigationCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/registrations/edit-password.html', controller: 'PasswordCtrl'}
                }
            });
    }]);
