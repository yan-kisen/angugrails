AnguGrails: A starting point for single page AngularJS/Grails application
=========================================================================

What is this?
-------------

This is the result of my research and development to put together a single page web application using
the current state of the art web and development technologies as of Spring 2014. 

There are now so many different frameworks for both client side and server side development that
the choices can be confusing. For most frameworks, it probably doesn't matter which ones you choose
as long as you know how to use the ones you have selected and you understand the security requirements
and choices that are made by your implementation.  This sample application uses AngularJS for the client
side single page app, and the Groovy on Grails environment for the server side.

Nothing in this project is original, but is made up from bits and pieces of blogs and sample projects and
StackOverflow questions and answers that I have found online. Hopefully I have packaged these bits and pieces
in such a way that it is useful to somebody besides myself.

As I have time, or if I have time, I will implement the TBD section. Any feedback is welcome.


Try it out
-----------

  * Make sure you have grails 2.3.7 installed and working locally.
  * Clone this project
  * The default configuration uses an in memory h2 database that is recreated each time you run the server,
    thus losing any new users you created. If you use this for any real development, you will want to edit
    the bootstrap.groovy file to create baseline set of development data on startup each time.
  * grails run-app
  * browse to http://localhost:8080/angugrails/ to see the default grails page and list of controllers
  * click on the Home controller.
  * Click on the Sign Up tab at the top.
  * Create a new account.
  * Try using that account to login and logout.
  * Try changing your password, and verify that it has worked.


Authentication Rules
--------------------

Users login by entering their username and password. And in this model the email address for a user does not have
to be unique. This could be done differently for a project by changing the email constraints or the user model.

Spring Security Annotations within controllers are used to restrict access to api actions, and non-api actions.
Actions provided by plugins are restricted by the roles assigned to the configuration value:

grails.plugin.springsecurity.controllerAnnotations.staticRules

This is defined in the grails-app/conf/Config.groovy file.


Persistent Database with Migrations
-----------------------------------

If you want you could change the DataSource url to use an in memory store for h2d. This project includes configuration
for mysql, as well as lines in BuildConfig.groovy for mysql to uncomment.

If you use a persistent database, once you have created the database instance or schema, you can build the
initial set of tables (user, role, user_role, authentication_token) with the command:

grails dbm-update



Server Features
----------------

  * Grails 2.3.7
  * twitter-bootstrap:3.1.1: serves twitter bootstrap resources to single page app.
  * spring-security-rest:1.3.2 : implements authentication token without using http session for stateless REST API.
  * spring-security-core:2.0-RC2: spring security authentication filters for authentication and authorization.
  * database-migration:1.3.8: grails database migrations for building the user authentication db objects.
  * serves the css and html web templates for the client application.
  * the HomeController index action returns the one page angularjs application.
  * once the app starts, it makes rest calls to the api actions.
  * serves the locale file for the language localization vi the LocaleController.


Client Features and Modules
---------------------------

  * AngularJS v1.2.14
  * bootstrap 3
  * angular-ui-router v0.2.8: plugin for managing states of the client ui.
  * angular-translate v1.1.1: I18N and localization of AngularJS app.
  * angular-translate-loader-url: v2.1.0: client app pulls down json translation resources.
  * angular-validation: v1.0 beta: interesting plugin but needs more validations such as password confirmation.
  * uses two views and controllers per state, where one view and controller is for nav bar.
  * single page app implements sign up new user, login, logout, change password,
    and access controlled home page.

TBD
---

  * implement unit and functional testing across all modules.
  * improved server validation error handling.
  * complete form validation for password/password confirm compare.
  * deployed demo.
  * localize error messages from server.
  * cross browser and mobile test.
  * email confirmation of new registrations.
  * reset auth token when changing password to force relogin.
  * transition animations.


Server Project Structure
------------------------

Grails apps are much more standardized than angular apps, so there should not be
many surprises here. The mapping of controller actions to api calls is done in the
URLMappings.groovy file. Instead of using the resources helpers, the routes are
spelled out explicitly and this seems to work better. Likewise, the controllers do not derive from RestfulController
for similar reasons.

The default grails index page is still provided by the project.

The javascript for the client application and web templates are all under the web-app
directory on the server. The structure looks like this:


web-app/lib/(all javascript angular related libraries here)
web-app/js/ng-app/controllers
web-app/js/ng-app/directives
web-app/js/ng-app/angugrails.js - main application file that creates the angugrails module.

web-app/views/ - all of the view templates downloaded by the angular app are stored here on
   the server. currently no authentication is required to download these.


Client Project Structure
------------------------

AngularJS has fewer conventions than Grails so there are a lot of different patterns
that can be used for developing Angular apps. This implementation attempts to provide
a foundation that can evolve and scale to a large client side application.

Each angular-route-ui state represents one type of action, such as login, logout,
register and update user. There is one controller per state that is responsible
for implementing a submit action that calls the appropriate service methods and
handles the resolution of the service method promise by updating $scope.data values
and forwarding to a new state if necessary.

A state-transition-handler is responsible for redirecting the state to a 'login' state
if the web user is not authorized to go to that state.


The web-service.js service is responsible for keeping track of the authentication
token, and processing http errors. The controllers can watch values in the web-service for
the current logged in user and share that in their scope with the views.








