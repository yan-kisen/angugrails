AnguGrails: A starting point for single page AngularJS/Grails application
=========================================================================

Try it out
-----------

  * Make sure you have grails 2.3.7 installed and working locally.
  * Clone this project
  * The default configuration uses an in memory h2 database that is recreated each time you run the server,
    thus losing any new users you created. This makes it easier to get going, though.
  * grails run-app
  * browse to http://localhost:8080/angugrails/ to see the default grails page and list of controllers
  * click on the Home controller.
  * Click on the Sign Up tab at the top.
  * Create a new account.
  * Try using that account to login and logout.


Persistent Database
-------------------

  * If you want you could change the DataSource url to use an in memory store for h2d.
  * You could add code to bootstrap so that it loads a set of standard development data each time the db
    is recreated.
  * This project includes configuration for mysql, as well as lines in BuildConfig.groovy for mysql to uncomment.
  * If you use a persistent database, you can build the tables with the command: grails dbm-update

Server Features
----------------

  * Grails 2.3.7
  * Spring Security Core 2.0 for authentication and authorization
  * Spring Security Rest for implementing REST Api with auth token.
  * grails database migrations for building the user authentication db objects.
  * serves the css and html web templates for the client application.
  * the HomeController index action returns the one page angularjs application.
  * once the app starts, it makes rest calls to the api actions.


Client Features and Modules
---------------------------

  * AngularJS v1.2.14
  * bootstrap 3
  * angular-ui-router v0.2.8: plugin for managing states of the client ui.
  * angular-translate v1.1.1: 
  * angular-translate-loader-url: v2.1.0
  * angular-validation: v1.0 beta - interesting plugin but needs more validations.
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


Server Project Structure
------------------------

Grails apps are much more standardized than angular apps, so there should not be
many surprises here. The mapping of controller actions to api calls is done in the
URLMappings.groovy file. Instead of using the resources helpers, the routes are
spelled out explicitly and this seems to work better.

The default grails index page is still provided by the project.


Client Project Structure
------------------------

Each angular-route-ui state represents one type of action, such as login, logout,
register and update user. There is one controller per state that is responsible
for implementing a submit action that calls the appropriate service methods and
handles the resolution of the service method promise by updating $scope.data values
and forwarding to a new state if necessary.


The web-service.js service is responsible for keeping track of the authentication
token, and handling http errors and redirecting to the login state if the user
is not authorized. The controllers can watch values in the web-service for 
the current logged in user and share that in their scope with the views.


The views will be updated by the changes to scope data and state.

web-app/lib/(all javascript angular related libraries here)
web-app/js/ng-app/controllers
web-app/js/ng-app/directives
web-app/js/ng-app/angugrails.js - main application file that creates the angugrails module.

web-app/views/ - all of the view templates downloaded by the angular app are stored here on
   the server. currently no authentication is required to download these.





