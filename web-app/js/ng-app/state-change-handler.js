angular.module('angugrails.services').service('StateChangeService', [])
    .run(['$rootScope', '$location', '$log', '$state', 'WebService', 'FlashService',
        function ($rootScope, $location, $log, $state, WebService, FlashService) {

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $log.debug("stateChangeStart, From: '" + current.name + "' to: '" + next.name + "'");
            FlashService.setStatusCode("");
            if (!WebService.isAuthorized(next)) {
                event.preventDefault();
                $state.transitionTo('login');

            }
        });

    }]);
