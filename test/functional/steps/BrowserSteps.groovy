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
 * Then "[element-id]" should be enabled
 */
Then(~'^"([^"]*)" should be enabled$') { String id ->
    def elem =  $('#' + id)
    assert elem && elem.displayed && !elem.disabled
}

/**
 * Then the error message should be "[error message]"
 */
Then(~'^the error alert should be "([^"]*)"') { String message ->
    assertAlert('alert-danger', message)
}

/**
 * Then the confirmation message should be "[confirmation message]"
 */
Then(~'^the success alert should be "([^"]*)"') { String message ->
    assertAlert('alert-success', message)
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
Then(~'^"([^"]*)" text should appear as "([^"]*)"$') { String id, String text->
    waitFor {
        $('#' + id) && $('#' + id).displayed
    }
    compareText(id, text)
}

/**
 * Then "[element-id]" text should be "[text string]".
 *
 * Immediately compare the element's displayed text with validation text.
 */
Then(~'^"([^"]*)" text should be "([^"]*)"$') { String id, String text ->
    compareText(id, text)
}

Then(~'^error for "([^"]*)" should be "([^"]*)"$') { String field, String text ->
    compareText('errors' + field, text)
}

Then(~'^error for "([^"]*)" should be blank$') { String field ->
    assertBlank('errors' + field)
}


def assertBlank(String elementId) {
    def element =  $('#' + elementId)
    assert (!element || !element.displayed || element.text() == "")
}

def assertAlert(String cssClass, String message) {
    def elem =  $('#statusMessage')
    waitFor {
        elem && elem.displayed
    }
    assert elem.classes().find { it == cssClass }
    compareText('statusMessage', message)
}

def compareText(String elementId, String testText) {
    def cleanText = testText.replaceAll(/\s+/, " ")
    def cleanActualText = $("#${elementId}").text().replaceAll(/\s+/, " ")
    assert cleanText == cleanActualText
}
