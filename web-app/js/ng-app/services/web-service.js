/**
 * WebService - a module of methods for authenticating with and using the server's web service endpoints.
 */
angular.module('angugrails.services').service('WebService', function ($http, $cookieStore, $log, $q, WebServiceUtil) {

    var headers = { };

    var isAuthenticated = false;
    var authRoles = undefined;
    var authUsername = undefined;
    // TBD: set authUserID correctly.
    var authUserId = undefined;

    /**
     * Returns wheter or not current session is active.
     * @returns {boolean}
     */
    this.getIsAuthenticated = function () {
        return isAuthenticated;
    };

    /**
     * Determine whether or not user is authorized to access given UI state.
     * @param state
     * @returns {boolean} True if and only if user is authorized to go to the given state.
     * TBD: remove dependency on state, and use a common list of roles per state instead which is passed in.
     */
    this.isAuthorized = function (state) {
        return  (state.noAuthRequired || isAuthenticated)
    };

    /**
     * Returns name of current logged in user.
     * @returns {undefined}
     */
    this.getAuthUsername = function () {
        return authUsername;
    };



    /**
     * Get list of roles available to current user.
     * @returns {Array[String]} List of assigned roles.
     */
    this.getAuthRoles = function () {
        return authRoles;
    };

    /**
     * Clear all authentication tokens and role information.
     * @private
     */
    this._clearAuth = function () {
        headers['X-Auth-Token'] = undefined;

        isAuthenticated = false;
        authRoles = undefined;
        authUsername = undefined;
        authUserId = undefined;
    };


    /**
     * Register a new user with the web service.
     *
     * @param {String} unique name of new user
     * @param {String} email address of new user
     * @param {String} password entered by user
     * @param {String} confirmation of password entered by user
     *
     * @return {Promise} to be resolved or rejected when request is complete or fails.
     */
    this.register = function (username, email, password) {
        var resp,
            myq,
            reason;

        if (isAuthenticated) {
            myq = $q.defer();
            myq.reject({reason: "Register not allowed while already logged in."})
            resp = myq.promise
        } else {
            resp = $http({    method: 'POST',
                url: '/angugrails/api/user',
                data: {username: username, email: email, password: password},
                headers: headers}).
                then(function (response) {
                    $log.info("http registration request success.");
                },
                function (response) {
                    return $q.reject(WebServiceUtil.handleHttpError(response));
                });
        }
        return resp;
    };


    /**
     * Change the password of the current logged in user.
     *
     * @param {String} currentPassword
     * @param {String} newPassword
     *
     * @return {Promise} to be resolved or rejected when request is complete or fails.
     */
    this.changePassword = function (currentPassword, newPassword) {
        var resp,
            reason;
        if (!isAuthenticated) {
            myq = $q.defer();
            myq.reject({reason: "Must be authenticated."});
            resp = myq.promise;
        } else {
            resp = $http({    method: 'PUT',
                url: '/angugrails/api/user',
                data: {currentPassword: currentPassword, password: newPassword },
                headers: headers}).
                then(function (response) {
                    $log.info("password change request successful.");
                },
                function (response) {
                    return $q.reject(WebServiceUtil.handleHttpError(response));
                });
        }
        return resp;
    };


    /**
     * Login and authenticate a new session.
     *
     * @param {String} name of user
     * @param {String} password for user
     *
     * @return {Promise} to be resolved or rejected when request is complete or fails.
     */
    this.login = function (username, password) {
        var resp;
        if (isAuthenticated) {
            myq = $q.defer();
            myq.resolve("Already logged in.")
            resp = myq.promise
        } else {
            resp = $http({    method: 'POST',
                url: '/angugrails/api/login',
                data: {username: username, password: password},
                headers: headers}).
                then(function (response) {
                    $log.info("http request success.");

                    headers['X-Auth-Token'] = response.data.token;
                    authUsername = response.data.username;
                    authRoles = response.data.roles;
                    isAuthenticated = true;
                },
                function (response) {
                    return $q.reject(WebServiceUtil.handleHttpError(response));
                });
        }
        return resp;
    };

    /**
     * Logout and end the current session with the server.
     *
     * @return {Promise} to be resolved or rejected when request is complete or fails.
     */
    this.logout = function () {
        var resp;
        if (!isAuthenticated) {
            myq = $q.defer()
            myq.resolve("Already logged out.")
            resp = myq.promise;
        } else {
            // note - DELETE method is not supported by logout endpoint.
            resp = $http({ method: 'POST',
                url: '/angugrails/api/logout',
                headers: headers}).
                then(function (response) {
                    $log.info("logout successful")
                },
                function (response) {
                    reason = WebServiceUtil.handleHttpError(response);
                    // ignore errors on logout
                });
            this._clearAuth();
        }
        return resp;
    };


});
