/**
 * WebService - an object for keeping track of the flash message displayed at the top of the UI.
 *              this is not an angular way to do it. Maybe there is a more appropriate way?
 */
angular.module('angugrails.services').service('FlashService', function ($log) {

    var statusCode = "";

    /**
     * Sets the current status code to be displayed on the flash message.
     *
     * @param statusCode to be translated to localized message.
     */
    this.setStatusCode = function (code) {
        $log.debug("flash service set status code to " + code);
        statusCode = code;
    };


    /**
     * Returns status code from last successful service request.
     * @returns {undefined}
     */
    this.getStatusCode = function () {
        $log.debug("flash service getstatuscode, returning: " + statusCode);
        return statusCode;
    };


});