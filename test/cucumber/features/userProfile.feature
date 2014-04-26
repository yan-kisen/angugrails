
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
    When user enters "beepbeep" for "new-password"
    When user enters "beepbeep" for "confirm-new-password"
    When user clicks "submit"
    Then "home-content" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear

    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"
    Then "error-message" should appear

    When user enters "beepbeep" for "password"
    When user clicks "submit"
    Then "home-content" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear



  @current
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
    Then "submit" should be disabled

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
    When user enters "beepbeep" for "new-password"
    When user enters "beepbeep1" for "confirm-new-password"
    Then "submit" should be disabled

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear


  Scenario: User attempts to change password, enters new password that is too short.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "" for "password"
    When user enters "b" for "new-password"
    When user enters "b" for "confirm-new-password"
    When user clicks "submit"
    Then "error-message" should appear

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear