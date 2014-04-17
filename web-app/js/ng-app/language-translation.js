/**
 * Set up an english translation table for text on the app.
 */

angular.module('angugrails.i18n', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useUrlLoader('/angugrails/api/locale');
        $translateProvider.preferredLanguage('en_US');
}]);
