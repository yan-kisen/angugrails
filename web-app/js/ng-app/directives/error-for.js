angular.module('angugrails.directives')
    .directive('errors', function($log) {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                error: '='
            },
            template: '<span class="text-danger">{{ error }}</span>',
            link: function (scope, elm, attrs) {
                scope.$watch('error', function(newValue, oldValue) {
                    if (newValue) {
                        elm.show();
                    }
                });

                scope.$watch('field', function(newValue, oldValue) {
                    /* hide errors from server as soon as text field changes */
                    if (newValue) {
                       //  elm.hide();
                    }
                });
            }
        };
    });
