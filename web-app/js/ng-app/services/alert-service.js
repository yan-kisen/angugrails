/**
 * WebService - an object for keeping track of the status of the last web request to the server that
 *              is displayed in the row below the navigation bar. This would not work well for concurrent
 *              request processing since there can be only one state.
 */
angular.module('angugrails.services').service('AlertService', function ($log) {

    var statusCode = "";
    var level = "";



    this.passed = function(code) {
        this.alert("PASSED", code);
    }

    this.failed = function(code) {
        this.alert("ERROR", code);
    }

    /**
     * Sets the current status code to be displayed on the alert message.
     *
     * @param statusCode to be translated to localized message.
     */
    this.alert = function (level, code) {
        this.level = level;
        this.statusCode = code;
    };

    /**
     * Clears the current status to no alert.
     */
    this.reset = function() {
        this.level = "";
        this.statusCode = "";
    };


    /**
     * Returns status code for last alert.
     * @returns code
     */
    this.getStatusCode = function () {
        return this.statusCode;
    };

    /**
     * Returns status error level for last alert.
     */
    this.getLevel = function () {
        return this.level;
    };


});