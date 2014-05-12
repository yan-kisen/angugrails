//
angular.module('angugrails.controllers').
    controller('AlertCtrl', function AlertController($scope, $state, $log, AlertService) {

        $scope.reset = function () {
            // always clear flash message status code on page load.
            $scope.statusCode = "";
            $scope.level = "";
            $scope.displayClass = "";

            $scope.failedDisplayClass = "alert alert-danger";
            $scope.passedDisplayClass = "alert alert-success" ;
        };

        $scope.reset();

        $scope.$watch(function() {
            return AlertService.statusCode;
        }, function(statusCode) {
            $scope.statusCode = AlertService.statusCode;
            $log.debug("set statusCode for flash to: " + $scope.statusCode);
        });

        $scope.$watch(function() {
            return AlertService.getLevel();
        }, function(level) {
            $scope.level = AlertService.getLevel();
            if ($scope.level === "PASSED") {
                $scope.displayClass = $scope.passedDisplayClass;
            } else {
                $scope.displayClass = $scope.failedDisplayClass;
            }
            $log.debug("set statusCode for flash to: " + $scope.statusCode);
        });
    });
