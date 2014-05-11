/**
 * angular-validation - v1.0 - 2014-02-07
 * https://github.com/ghiscoding/angular-validation
 * @author: Ghislain B.
 *
 * @desc: If a field becomes invalid, the text inside the error <span> or <div> will show up because the error string gets filled
 * Though when the field becomes valid then the error message becomes an empty string,
 * it will be transparent to the user even though the <span> still exist but becomes invisible since the text is empty.
 */
angular.module('ghiscoding.validation', ['pascalprecht.translate'])
    .directive('validation', function($translate) {
        return {
            require: "ngModel",
            link: function(scope, elm, attrs, ctrl) {
                // default validation event that triggers the validation error to be displayed
                var DEFAULT_EVENT = "blur";         // keyup, blur, ...


                // get the validation attribute
                var validationAttr = attrs.validation;
                var fieldId = attrs.id;

                // define the variables we'll use
                var messages = [];
                var patterns = [];
                var validators = [];
                var regexMessage;
                var regexPattern;
                var validations;
                var compareField;

                var matchPatternValidator = function(pattern, value) {
                    var regex = new RegExp(pattern, 'i');
                    return regex.test(value);
                };

                var requiredValidator = function(pattern, value) {
                    return ((typeof value !== "undefined") && (value !== null) && (value !== ""));
                };

                var sameValidator = function(element, value) {
                    return (value === element.val());
                };

                // We first need to see if the validation holds a regex, if it does treat it first
                // So why treat it separately? Because a Regex might hold pipe '|' and so we don't want to mix it with our regular validation pipe
                // Return string will have the complete regex pattern removed but we will keep ':regex' so that we can still loop over it
                if(validationAttr.indexOf("regex:") >= 0) {
                    var matches = validationAttr.match("regex:(.*?):regex");
                    var regAttrs = matches[1].split(':=');
                    regexMessage = regAttrs[0];
                    regexPattern = regAttrs[1];

                    // rewrite the validationAttr so that it doesn't contain the regex: ... :regex ending
                    // we simply remove it so that it won't break if there's a pipe | inside the actual regex
                    validationAttr = validationAttr.replace(matches[0], 'regex:');
                }

                // at this point it's safe to split with pipe (since regex was previously stripped out)
                validations = validationAttr.split('|');

                if(validations) {
                    for(var i = 0, ln = validations.length; i < ln; i++) {
                        var params = validations[i].split(':');
                        validators[i] =  matchPatternValidator // the default validator and covers all but two cases
                        switch(params[0]) {
                            case "alpha" :
                                patterns[i] = "^([a-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA'
                                };
                                break;
                            case "alphaSpaces" :
                            case "alpha_spaces" :
                                patterns[i] = "^([a-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\\s])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA_SPACE'
                                };
                                break;
                            case "alphaNum" :
                            case "alpha_num" :
                                patterns[i] = "^([a-z0-9ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA_NUM'
                                };
                                break;
                            case "alphaNumSpaces" :
                            case "alpha_num_spaces" :
                                patterns[i] = "^([a-z0-9ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\\s])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA_NUM_SPACE'
                                };
                                break;
                            case "alphaDash" :
                            case "alpha_dash" :
                                patterns[i] = "^([a-z0-9ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ_-])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA_DASH'
                                };
                                break;
                            case "alphaDashSpaces" :
                            case "alpha_dash_spaces" :
                                patterns[i] = "^([a-z0-9ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\\s_-])+$";
                                messages[i] = {
                                    message: 'INVALID_ALPHA_DASH_SPACE'
                                };
                                break;
                            case "betweenLen" :
                            case "between_len" :
                                var range = params[1].split(',');
                                patterns[i] = "^.{" + range[0] + "," + range[1] + "}$";
                                messages[i] = {
                                    message: 'INVALID_BETWEEN',
                                    params: [range[0], range[1]]
                                };
                                break;
                            case "creditCard" :
                            case "credit_card" :
                                patterns[i] = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})$";
                                messages[i] = {
                                    message: 'INVALID_CREDIT_CARD'
                                };
                                break;
                            case "dateIso" :
                            case "date_iso" :
                                patterns[i] = "^(19|20)\\d\\d([-])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])$";
                                messages[i] = {
                                    message: 'INVALID_DATE_ISO'
                                };
                                break;
                            case "dateUsLong" :
                            case "date_us_long" :
                                patterns[i] = "^(0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])[-/](19|20)\\d\\d$";
                                messages[i] = {
                                    message: 'INVALID_DATE_US_LONG'
                                };
                                break;
                            case "dateUsShort" :
                            case "date_us_short" :
                                patterns[i] = "^(0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])[-/]\\d\\d$";
                                messages[i] = {
                                    message: 'INVALID_DATE_US_SHORT'
                                };
                                break;
                            case "dateEuroLong" :
                            case "date_euro_long" :
                                patterns[i] = "^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)\\d\\d$";
                                messages[i] = {
                                    message: 'INVALID_DATE_EURO_LONG'
                                };
                                break;
                            case "dateEuroShort" :
                            case "date_euro_short" :
                                patterns[i] = "^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/]\\d\\d$";
                                messages[i] = {
                                    message: 'INVALID_DATE_EURO_SHORT'
                                };
                                break;
                            case "email" :
                                patterns[i] = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
                                messages[i] = {
                                    message: 'INVALID_EMAIL'
                                };
                                break;
                            case "exactLen" :
                            case "exact_len" :
                                patterns[i] = "^.{" + params[1] + "}$";
                                messages[i] = {
                                    message: 'INVALID_EXACT_LEN',
                                    params: [params[1]]
                                };
                                break;
                            case "float" :
                                patterns[i] = "^\\d+[\\.]+\\d+$";
                                messages[i] = {
                                    message: 'INVALID_FLOAT'
                                };
                                break;
                            case "floatSigned" :
                            case "float_signed" :
                                patterns[i] = "^[+-]?\\d+[\\.]+\\d+$";
                                messages[i] = {
                                    message: 'INVALID_FLOAT_SIGNED'
                                };
                                break;
                            case "iban" :
                                patterns[i] = "[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}";
                                messages[i] = {
                                    message: 'INVALID_IBAN'
                                };
                                break;
                            case "integer" :
                                patterns[i] = "^\\d+$";
                                messages[i] = {
                                    message: 'INVALID_INTEGER'
                                };
                                break;
                            case "integerSigned" :
                            case "integer_signed" :
                                patterns[i] = "^[+-]?\\d+$";
                                messages[i] = {
                                    message: 'INVALID_INTEGER_SIGNED'
                                };
                                break;
                            case "maxLen" :
                            case "max_len" :
                                patterns[i] = "^.{0," + params[1] + "}$";
                                messages[i] = {
                                    message: 'INVALID_MAX_CHAR',
                                    params: [params[1]]
                                };
                                break;
                            case "minLen" :
                            case "min_len" :
                                patterns[i] = "^.{" + params[1] + ",}$";
                                messages[i] = {
                                    message: 'INVALID_MIN_CHAR',
                                    params: [params[1]]
                                };
                                break;
                            case "numeric" :
                                patterns[i] = "^\\d+[\\.]?\\d*$";
                                messages[i] = {
                                    message: 'INVALID_NUMERIC'
                                };
                            case "numeric_signed" :
                                patterns[i] = "^[-+]?\\d+[\\.]?\\d*$";
                                messages[i] = {
                                    message: 'INVALID_NUMERIC_SIGNED'
                                };
                                break;
                            case "regex" :
                                // Regex is a special case, the regexMessage & regexPattern variables
                                // were created and dealt separately prior to the for loop
                                patterns[i] = regexPattern;
                                messages[i] = {
                                    message: 'INVALID_PATTERN',
                                    params: [regexMessage]
                                };
                                break;
                            case "required" :
                                validators[i] = requiredValidator;
                                patterns[i] = "\\S+";
                                messages[i] = {
                                    message: 'INVALID_REQUIRED'
                                };
                                break;
                            case "same":
                                var sourceElem = angular.element(document.querySelector('#'+params[1]));
                                // TBD: add an event handler to update while the source field changes.
                                validators[i] = sameValidator;
                                patterns[i] = sourceElem;
                                messages[i] = {
                                    message: 'INVALID_SAME',
                                    params: [params[2]] // key for parameter replacement.
                                };
                                break;

                            case "rechecksame":
                                var dependElement = angular.element(document.querySelector('#'+params[1]));
                                // TBD: add an event handler to update while the source field changes.
                                validators[i] = sameValidator;
                                patterns[i] = sourceElem;
                                messages[i] = {
                                    message: 'INVALID_SAME',
                                    params: [params[2]] // key for parameter replacement.
                                };
                                break;

                            case "url" :
                                patterns[i] = "(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?";
                                messages[i] = {
                                    message: 'INVALID_URL'
                                };
                                break;
                        }
                    }
                }



                /** Validate function, from the input value it will go through all validators (separated by pipe)
                 *  that were passed to the input element and will validate it. If field is invalid it will update
                 *  the error text of the span/div element dedicated for that error display.
                 * @param string value: value of the input field
                 */
                var validate = function(value) {
                    var isValid = true;
                    var isFieldValid = true;
                    var message = "";
                    var maxErrors = 1;
                    var errorCount = 0;

                    // loop through and apply all validations (could be multiple)
                    // this goes in reverse, which maps to the same order they appeared on the attribute,
                    // with the exception of regex patterns that get applied first.
                    for(var j = 0, jln = patterns.length; (j < jln ) && (errorCount < maxErrors); j++) {

                        if(!validators[j](patterns[j], value)) {
                            isFieldValid = false;
                            message +=  $translate(messages[j].message);
                            // replace any error message params that were passed
                            if(typeof messages[j].params !== "undefined") {
                                for(var k = 0, kln = messages[j].params.length; k < kln; k++) {
                                    message = message.replace((':param'), $translate(messages[j].params[k]));
                                }
                            }
                            errorCount++;
                        } // end !isValid
                    } // end for loop

                    var field = attrs.id;

                    /* an empty message from client validation should erase any previous server error for this field */
                    scope.errors[field] = message;


                    return isFieldValid;
                }

                var applyValidate = function() {
                    scope.$apply(ctrl.$setValidity('validation', validate(ctrl.$modelValue)));
                }


                elm.bind('blur', function() {
                    applyValidate();
                });

                elm.bind('keyup', function() {
                    applyValidate();
                })


                // attach the Validator object to the element
                // ctrl.$parsers.unshift(validator);
                // ctrl.$formatters.unshift(validator);

                // for the case of field that might be ng-disabled, we should skip validation
                // Observe the angular disabled attribute
                attrs.$observe("disabled",function(disabled) {
                    if(disabled){
                        // Turn off validation when disabled
                        ctrl.$setValidity('validation', true);
                    }
                });
            }
        };
    });