//
angular.module('angugrails.controllers').
    controller('FlashCtrl', function FlashController($scope, $state, $log, FlashService) {

        $scope.reset = function () {
            // always clear flash message status code on page load.
            $scope.statusCode = "";
        };

        $scope.reset();

        $scope.$watch(function() {
            return FlashService.getStatusCode();
        }, function(statusCode) {
            $scope.statusCode = FlashService.getStatusCode();
            $log.debug("set statusCode for flash to: " + $scope.statusCode);
        });
    });
