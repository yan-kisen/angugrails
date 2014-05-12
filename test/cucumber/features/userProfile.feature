
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
    And the success alert should be "You are now signed in"

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "testpassword1" for "password"
    When user enters "beepbeep" for "newPassword"
    When user enters "beepbeep" for "confirmNewPassword"
    When user clicks "submit"
    Then "home-content" should appear
    And the success alert should be "Your profile has been changed"

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear
    And the success alert should be "You are logged out"

    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"
    Then the error alert should be "Access denied for given username and password"


    When user enters "beepbeep" for "password"
    When user clicks "submit"
    Then "home-content" should appear
    And the success alert should be "You are now signed in"

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear
    And the success alert should be "You are logged out"



  Scenario: User attempts to change password, enters invalid current password.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "badpassword" for "password"
    When user enters "beepbeep" for "newPassword"
    When user enters "beepbeep" for "confirmNewPassword"
    When user clicks "submit"
    Then the error alert should be "Access denied for given username and password"

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear


  @current
  Scenario: User attempts to change password, enters invalid password confirmation on first attempt.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "password1" for "password"
    When user enters "beepbeep" for "newPassword"
    When user enters "beepbeep1" for "confirmNewPassword"
    Then "errorsConfirmNewPassword" text should be "Must match New Password"
    And "submit" should be disabled

    When user enters "beepbeep" for "confirmNewPassword"
    Then error for "ConfirmationNewPassword" should be blank
    And "submit" should be enabled

    When user clicks "submit"
    Then the error alert should be "Access denied for given username and password"

    When user enters "testpassword1" for "password"
    Then error for "Password" should be blank
    And "submit" should be enabled

    When user clicks "submit"
    Then "home-content" should appear
    And the success alert should be "Your profile has been changed"

    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear


  Scenario: User attempts to change password, enters password confirmation first.
    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then "home-content" should appear

    When user clicks "nav-profile"
    Then "profile-form" should appear

    When user enters "password1" for "password"
    When user enters "beepbeep1" for "confirmNewPassword"
    Then error for "ConfirmNewPassword" should be "Must match New Password"
    And "submit" should be disabled

    When user enters "beepbeep1" for "newPassword"
    Then error for "ConfirmNewPassword" should be blank
    And "submit" should be enabled

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
    Then error for "Password" should be "Required"
    And error for "ConfirmNewPassword" should be "Must match New Password"
    And "submit" should be disabled

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

    When user clicks "password"
    When user enters "" for "password"
    When user enters "b" for "newPassword"
    When user enters "b" for "confirmNewPassword"
    Then "submit" should be disabled
    And error for "Password" should be "Required"
    And error for "NewPassword" should be "Must be at least 5 characters"

    When user enters "bb" for "confirmNewPassword"
    Then error for "ConfirmNewPassword" should be "Must match New Password"


    When user clicks "nav-logout"
    Then "logout-form" should appear

    When user clicks "submit"
    Then "login-form" should appear