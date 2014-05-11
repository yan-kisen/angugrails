/**
 * RunService - a module of methods for javascript execution patterns.
 */
angular.module('angugrails.services').service('RunService', function ($log) {

    var curry = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function() {
            return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
        };
    };

});