angular.module('angugrails.services').service('StateChangeService', [])
    .run(['$rootScope', '$location', '$log', '$state', 'WebService', 'AlertService',
        function ($rootScope, $location, $log, $state, WebService, AlertService) {

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $log.debug("stateChangeStart, From: '" + current.name + "' to: '" + next.name + "'");
            AlertService.reset();
            if (!WebService.isAuthorized(next)) {
                event.preventDefault();
                $state.transitionTo('login');

            }
        });

    }]);
