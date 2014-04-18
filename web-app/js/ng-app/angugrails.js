// Declare app level module which depends on filters, and services
angular.module('angugrails.resources', ['ngResource']);
angular.module('angugrails.services', ['ngResource']);
angular.module('angugrails.directives', []);
angular.module('angugrails.filters', []);
angular.module('angugrails.controllers', ['ngCookies', 'ui.router']);
angular.module('angugrails.i18n', ['pascalprecht.translate']);

var App = angular.module('angugrails', [
    'angugrails.resources',
    'pascalprecht.translate',
    'ghiscoding.validation',
    'angugrails.i18n',
    'angugrails.services',
    'angugrails.directives',
    'angugrails.filters',
    'angugrails.controllers',
    'ui.router',
    'mgcrea.ngStrap'
]);


// focus on the first input when the page loads
window.focus = function (selector) {
    // timeout is needed for Chrome (is a bug in Chrome)
    setTimeout(function () {
        $(!!selector ? selector : '[autofocus]:not(:focus)').first().focus();
    }, 1);
};
