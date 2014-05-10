
Feature: User Profile
  Background:
    Given the db is reset
    Given the db is loaded with new user. username: "user1" email: "testuser1@example.com" password: "testpassword1"
    Given user opens browser
    Then user goes to "/home"

  Scenario: User succesfully changes password.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "testpassword1" for "password"
    When user enters "beepbeep" for "newPassword"
    When user enters "beepbeep" for "confirmNewPassword"
    When user clicks "submit"
    Then "home-content" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear

    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"
    Then "errorMessage" text should appear as "Access denied for given username and password."


    When user enters "beepbeep" for "password"
    When user clicks "submit"
    Then "home-content" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear



  Scenario: User attempts to change password, enters invalid current password.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "badpassword" for "password"
    When user enters "beepbeep" for "new-password"
    When user enters "beepbeep" for "confirm-new-password"
    When user clicks "submit"
    Then "error-message" text should appear as "Access denied for given username and password."

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear



  Scenario: User attempts to change password, enters invalid password confirmation.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "password1" for "password"
    When user enters "beepbeep" for "new-password"
    When user enters "beepbeep1" for "confirm-new-password"
    Then "submit" should be disabled

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear


  Scenario: User attempts to change password, does not enter current password and fails.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "" for "password"
    When user enters "beepbeep" for "newPassword"
    When user enters "beepbeep1" for "confirmNewPassword"
    Then "submit" should be disabled

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear

  @current
  Scenario: User attempts to change password, enters new password that is too short.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user clicks on "password"
    When user enters "" for "password"
    When user enters "b" for "newPassword"
    When user enters "b" for "confirmNewPassword"
    Then "submit" should be disabled
    And "errorsPassword" text should be "Required."
    And "errorsNewPassword" text should be "Must be at least 5 characters."

    When user enters "bb" for "confirmNewPassword"
    Then "errorsConfirmNewPassword" text should appear as "Must match Password."


    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear