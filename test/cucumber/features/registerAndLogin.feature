Feature: Register and Log In

  Background:
    Given user opens browser
    Then user goes to "/home"

  Scenario: A new user is registered and the user logs in successfully, followed by logging out.

    Then user clicks "nav-register"
    And user waits for "submit" to appear
    Then user enters "testuser1" for "username"
    Then user enters "test@example.com" for "email"
    Then user enters "testpassword" for "password"
    Then user enters "testpassword" for "password-confirm"
    Then user clicks "submit"

    And user waits for "login-form" to appear
    Then user enters "testuser1" for "username"
    Then user enters "testpassword" for "password"
    Then user clicks "submit"

    And user waits for "home-content" to appear
    Then "home-content" text should be "This is the home page content, which can only be seen while you are authenticated."

    And user clicks "nav-logout"
    Then user waits for "logout-form" to appear
    Then user clicks "submit"

    Then user waits for "login-form" to appear


 Scenario: A user attempts to login with invalid credentials

    Given user enters "invalid" for "username"
    And user enters "invalid" for "password"
    Then user clicks "submit"

    Then user waits for "error-message" to appear

  Scenario: An existing user logs in with valid credentials
    Given test loads new user with username: "user1" email: "testuser1@example.com" password: "testpassword1"
    Given test loads new user with username: "user2" email: "testuser2@example.com" password: "testpassword2"
    Given test loads new user with username: "user3" email: "testuser3@example.com" password: "testpassword3"
    Given test loads new user with username: "user4" email: "testuser4@example.com" password: "testpassword4"

    When user enters "user1" for "username"
    When user enters "testpassword1" for "password"
    When user clicks "submit"

    Then user waits for "home-content" to appear

    When user clicks "nav-logout"
    Then user waits for "logout-form" to appear

    When user clicks "submit"
    Then user waits for "login-form" to appear



