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
        var httpStatus = response.status;
        var errors = response.data.errors;

        if (httpStatus == 422) {
            description = "HTTP_422";
        } else if (httpStatus == 400) {
            description = "HTTP_400";
        } else if (httpStatus == 404) {
            description = "HTTP_404";
        } else if (httpStatus == 500) {
            description = "HTTP_500";
        } else if (httpStatus == 403) {
            description = "HTTP_403";
        } else {
            description = "HTTP_UNEXPECTED_ERROR";
        }
        $log.error("Http status response: " + httpStatus);
        return { httpStatus: httpStatus, description: description, errors: response.data.errors };
    };

});
