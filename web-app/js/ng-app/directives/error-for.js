angular.module('angugrails.directives')
    .directive('errors', function($log) {
        return {
            restrict: 'E',
            scope: {
                error: '='
            },
            template: '<span class="text-danger">{{ error }}</span>'
        };
    });
