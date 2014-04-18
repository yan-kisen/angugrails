/**
 * WebService - a module of methods for authenticating with and using the server's web service endpoints.
 */
angular.module('angugrails.services').service('WebServiceUtil', function ($http, $log) {


    /**
     * Parses and logs http error responses.
     *
     * @param response from the http call.
     * @returns {Object} attributes of return object are reason, httpError, errors array.
     * @private
     */
    this.handleHttpError = function (response) {
        var description;
        var httpError = response.status;

        if (response.status == 422) {
            description = "Please correct errors.";
        } else if (response.status == 400) {
            description = "Unexpected application error.";
        } else if (response.status == 404) {
            description = "Url not found. Unexpected application error.";
        } else if (response.status == 500) {
            description = "Unexpected server error.";
        } else if (response.status == 403) {
            description = "Access denied for given username and password.";
        } else {
            description = "Unexpected server request error."
        }
        $log.error("Http status response: " + httpError);
        return { httpError: httpError, description: description, errors: response.data.errors };
    };

});
