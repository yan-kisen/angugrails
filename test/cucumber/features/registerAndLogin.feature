Feature: Register and Log In

  Scenario: A new user is registered and the user logs in successfully, followed by logging out.

    Given user opens browser.
    Then user goes to "/home".
    Then user clicks "nav-register".
    And user waits for "submit" to appear.
    Then user enters "testuser1" for "username".
    Then user enters "test@example.com" for "email".
    Then user enters "testpassword" for "password".
    Then user enters "testpassword" for "password-confirm".
    Then user clicks "submit".

    And user waits for "loginForm" to appear.
    Then user enters "testuser1" for "username".
    Then user enters "testpassword" for "password".
    Then user clicks "submit".

    And user waits for "home-content" to appear.
    Then "home-content" text should be "This is the home page content, which can only be seen while you are authenticated.".