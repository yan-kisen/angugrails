package steps 

import pages.HomePage
import geb.*

import static cucumber.api.groovy.EN.*


Then(~'fail "([^"]*)"$') { String message ->
    throw new Exception(message)
}

/**
 * Given user opens browser.
 *
 * Does nothing, but is here to make the feature clear. The test framework itself should start the browser with the
 * web driver running.
 */
Given(~'^user opens browser$') {->

}

/**
 * When user goes to "[relative url]".
 *
 * Open the url at http://localhost:8080/angugrails/[relative url]
 */
When(~'^user goes to "([^"]*)"$') { String url ->
    go "/angugrails" + url
}

/**
 * When user clicks "[element-id]".
 *
 * Click the element with the element-id.
 */
When(~'^user clicks "([^"]*)"$') { String id ->
    $('#' + id).click()
}

/**
 * Then user enters "[text-string]" for "[element-id]".
 *
 * Enter text for a field.
 *
 */
When(~'^user enters "([^"]*)" for "([^"]*)"$') { String value, String id ->
    $("#${id}").value(value)
}

/**
 * Then user waits for "[element-id]" to appear.
 *
 * Wait for an element to appear, maybe in response to a server request.
 *
 */
Then(~'user waits for "([^"]*)" to appear$') { String id ->
    waitFor {
        $('#' + id) && $('#' + id).displayed
    }
}

/**
 * Then "[element-id]" text should be "[text string]".
 *
 * This will remove all whitespace from both strings before comparing them.
 */
Then(~'"([^"]*)" text should be "([^"]*)"$') { String id, String text ->
    def cleanText = text.replaceAll(/\s+/, " ")
    def cleanActualText = $("#${id}").text().replaceAll(/\s+/, " ")
    assert(cleanText == cleanActualText)
}
