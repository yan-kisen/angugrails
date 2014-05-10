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
 * Then "[element-id]" should be disabled
 */
Then(~'^"([^"]*)" should be disabled$') { String id ->
    assert $('#' + id) && $('#' + id).disabled
}

/**
 * Then "[element-id]" should not be visible
 */
Then(~'^"([^"]*)" should be blank$') { String id ->
    def element =  $('#' + id)
    assert (!element || !element.displayed || element.text() == "")
}

/**
 * Then "[element-id]" should appear.
 *
 * Wait for an element to appear, maybe in response to a server request.
 *
 */
Then(~'^"([^"]*)" should appear$') { String id ->
    waitFor {
        $('#' + id) && $('#' + id).displayed
    }
}

Then(~'^break debug$')  { ->
    def debug = true
    assert true
}
/**
 * Then "[element-id]" should appear as "[text displayed]"
 *
 * Wait for an element to appear, and compare the displayed text
 *
 */
Then(~'^"([^"]*)" should appear as "([^"]*)"$') { String id, String text->
    waitFor {
        $('#' + id) && $('#' + id).displayed
    }
    compareText(id, text)
}

/**
 * Then "[element-id]" text should be "[text string]".
 *
 * This will remove all whitespace from both strings before comparing them.
 */
Then(~'^"([^"]*)" text should be "([^"]*)"$') { String id, String text ->
    compareText(id, text)
}



def compareText(String elementId, String testText) {
    def cleanText = testText.replaceAll(/\s+/, " ")
    def cleanActualText = $("#${elementId}").text().replaceAll(/\s+/, " ")
    assert cleanText == cleanActualText
}
