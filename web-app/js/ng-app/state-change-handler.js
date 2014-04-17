angular.module('angugrails.services').service('StateChangeService', [])
    .run(['$rootScope', '$location', '$log', '$state', 'WebService', function ($rootScope, $location, $log, $state, WebService) {

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $log.debug("stateChangeStart, From: '" + current.name + "' to: '" + next.name + "'");
            if (!WebService.isAuthorized(next)) {
                event.preventDefault();
                $state.transitionTo('login');

            }
        });

    }]);
