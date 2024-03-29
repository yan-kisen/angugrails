modules = {

    'application' {
        dependsOn('bootstrap-js')
        dependsOn('bootstrap-css')
    }

    'angular-app' {
        dependsOn('application')
        resource url:"css/application.css", nominify:true
        resource url:"js/lib/angular.js"
        resource url:"js/lib/angular-resource.js"
        resource url:"js/lib/angular-cookies.js"
        resource url:"js/lib/angular-ui-router.js"
        resource url:"js/lib/angular-strap.js"
        resource url:"js/lib/animate.js"
        resource url:"js/lib/match.js"
        resource url:"js/lib/autofill-event.js"
        resource url:"js/lib/angular-translate.js", nominify: true
        resource url:"js/lib/angular-translate-loader-url.js", nominify: true
    }

    'angular-validation' {
        resource url:"js/lib/angular-validation.js", nominify: true
    }

    'angular-services' {
        resource url: 'js/ng-app/services/web-service-util.js', nominify:true
        resource url: 'js/ng-app/services/web-service.js', nominify:true
        resource url: 'js/ng-app/services/alert-service.js', nominify:true
        resource url: 'js/ng-app/services/run-service.js', nominify:true
    }

    'angular-controllers' {
        resource url: 'js/ng-app/controllers/home.js', nominify:true
        resource url: 'js/ng-app/controllers/logout.js', nominify:true
        resource url: 'js/ng-app/controllers/password.js', nominify:true
        resource url: 'js/ng-app/controllers/login.js', nominify:true
        resource url: 'js/ng-app/controllers/navigation.js', nominify:true
        resource url: 'js/ng-app/controllers/alert.js', nominify: true
    }

    'register-controller' {
        resource url: 'js/ng-app/controllers/register.js', nominify:true
    }

    'angular-directives' {
        resource url: "js/ng-app/directives/error-for.js", nominify: true
    }

    'angular-init' {
        resource url: 'js/ng-app/angugrails.js', nominify:true
        resource url: 'js/ng-app/language-translation.js', nominify: true
        resource url: 'js/ng-app/state-change-handler.js', nominify:true
    }


    'angugrails' {
        dependsOn('angular-app')
        dependsOn('angular-validation')
        dependsOn('angular-init')
        dependsOn('angular-services')
        dependsOn('angular-directives')
        dependsOn('angular-controllers')
        dependsOn('register-controller')

    }


}
