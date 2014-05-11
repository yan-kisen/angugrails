
Feature: Register and Log In

  Background:
    Given the db is reset
    Given the db is loaded with new user. username: "user1" email: "testuser1@example.com" password: "testpassword1"
    Given the db is loaded with new user. username: "user2" email: "testuser2@example.com" password: "testpassword2"
    Given the db is loaded with new user. username: "user3" email: "testuser3@example.com" password: "testpassword3"
    Given the db is loaded with new user. username: "user4" email: "testuser4@example.com" password: "testpassword4"
    Given user opens browser
    Given user goes to "/home"
    Then "login-form" should appear

  Scenario: A new user is registered and the user logs in successfully, followed by logging out.

    When user clicks "nav-register"
    Then "register-form" should appear
    And "errorsUsername" should be blank
    And "errorsEmail" should be blank
    And "errorsPassword" should be blank
    And "errorsConfirmPassword" should be blank

    When user enters "testuser1" for "username"
    When user enters "test@example.com" for "email"
    When user enters "testpassword" for "password"
    When user enters "testpassword" for "password-confirm"
    When user clicks "submit"
    Then "login-form" should appear

    When user enters "testuser1" for "username"
    When user enters "testpassword" for "password"
    When user clicks "submit"
    Then "home-content" text should appear as "This is the home page content, which can only be seen while you are authenticated."

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear


 Scenario: A user attempts to login with invalid credentials

    When user enters "invalid" for "username"
    When user enters "invalid" for "password"
    When user clicks "submit"
    Then "errorMessage" text should appear as "Access denied for given username and password."

  Scenario: An existing user logs in with valid credentials

    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"
    Then "home-content" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear



