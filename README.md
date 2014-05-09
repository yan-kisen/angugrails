#AnguGrails
`Version: 0.5 Alpha`

A sample application using Grails 2.3.8 with Spring security 2.0, and optional database migrations on the server side to implement a REST API
that serves resources for a single page application on the client using AngularJS. This application implements the following
stories, as separate angular-ui-router states:

  * Register new user ( no email confirmation yet )
  * Login
  * Logout
  * Change Password
  * View home page
  * Form validation on both client side and server side.
  * Functional test with Cucumber and remote-control, this is now working!
  * Grails unit test with spock

All text in the application is localized using the angular-translate library with the url loader for
translations. 

This is the result of my research and development to put together a single page web application using some of the current
state of the art web and development technologies as of Spring 2014. Hopefully I have packaged the bits and pieces of
ideas and code examples that I've found online into a project that is useful to somebody else.


There are no guarantees that this program will work for you, especially make sure you are confident in the authentication and authorization 
before using this for anything important!

As I have time, or if I have time, I will implement the TBD section. Any feedback is welcome.


Try it out
-----------

  * Make sure you have grails 2.3.8 installed and working locally.
  * Clone this github project to your local environment.
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

  * Grails 2.3.8
  * unit tests are implemented for grails domain objects, controllers, and services.
  * twitter-bootstrap:3.1.1: serves twitter bootstrap resources to single page app.
  * spring-security-rest:1.3.2 : implements authentication token without using http session for stateless REST API.
  * spring-security-core:2.0-RC2: spring security authentication filters for authentication and authorization.
  * database-migration:1.3.8: grails database migrations for building the user authentication db objects.
  * geb-0.9.2, selenium, cucumber:0.10.0
  * application-resources: all javascript and css files are packaged and served via grails application resource pipelining.
  * serves the html web templates for the client application.
  * the HomeController index action returns the one page angularjs application outline.
  * once the browser app starts, it makes rest calls to the api actions.
  * serves the locale file for the language localization vi the LocaleController.
  * there are no application objects defined other than the minimally required authentication domain objects.
  * home page requires authentication and displays one message from template.


Client Features and Modules
---------------------------

  * AngularJS v1.2.14
  * bootstrap 3
  * angular-ui-router v0.2.8: plugin for managing states of the client ui.
  * angular-translate v1.1.1: I18N and localization of AngularJS app.
  * angular-translate-loader-url: v2.1.0: client app pulls down json translation resources from LocaleController.
  * angular-validation: v1.0 beta: I made a few major changes to this plugin, mainly to support a common validation mechanism
                        for server error validation and client field validation which now works.
  * state management: uses two views and controllers per state, where one view and controller is for nav bar,
                      and the other view and controller represent the workspace beneath the navbar.
  * single page app implements sign up new user, login, logout, change password,
    and access controlled home page.

TBD, maybe someday
------------------

  * integration tests for the grails application.
  * complete the rest of the cucumber functional tests for the full application.
  * jasmine and other unit tests for the javascript angular application.
  * write a new angular-validation plugin that incorporates server and client validation handling like this does. 
  * deployed demo.
  * cross browser and mobile test.
  * email confirmation of new registrations.
  * reset auth token when changing password to force relogin.
  * transition animations.
  * implement this as a grails plugin.


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








