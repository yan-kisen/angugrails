//
angular.module('angugrails.controllers').
    controller('PasswordCtrl',function PasswordController($scope, $state, $log, WebService, FlashService) {

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
            FlashService.setStatusCode("");
            if ($scope.passwordForm.$valid) {
                $scope.errorMessage = "";
                $scope.errors['password'] = "";
                return WebService.changePassword($scope.password, $scope.newPassword).
                    then(function () {
                        $state.go('home');
                        FlashService.setStatusCode('STATUS_PASSWORD_CHANGED');
                    }, function (response) {
                        $scope.errorMessage = response.description;
                        if (response.httpStatus === 403) {
                            $scope.errors['password'] = "Invalid Password.";
                        } else {
                            for (var i =0; i < response.errors.length; i++) {
                                error = response.errors[i];
                                $scope.errors[error.field] = error.message;
                            }
                        }
                    });
            } else {
                // this should in theory not be called if form button is disabled when form is not valid.
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
                    "flash": { templateUrl: '/angugrails/ng-views/flash.html', controller: 'FlashCtrl'},
                    "content": { templateUrl: '/angugrails/ng-views/registrations/edit-password.html', controller: 'PasswordCtrl'}
                }
            });
    }]);
