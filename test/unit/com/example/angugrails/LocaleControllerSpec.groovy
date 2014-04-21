package com.example.angugrails;


import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(LocaleController)
class LocaleControllerSpec extends Specification {

    void "test show happy path"() {
        def localeServiceMock= mockFor(LocaleService)
        localeServiceMock.demandExplicit.getLocaleStream(1) { String arg1 ->
            def text = """
                    {
                    "MY_TEST_KEY": "My test translation"
                    }
            """

            return new ByteArrayInputStream(text.getBytes("UTF-8"));
        };

        controller.localeService = localeServiceMock.createMock()

        when:
        params.lang = "en_US"
        controller.show()

        then:
        response.status ==  200
        // One way to verify the response, compare the full text
        response.text ==  """
                    {
                    "MY_TEST_KEY": "My test translation"
                    }
            """
        // Another way to verify is via the json attribute of the response
        response.json.MY_TEST_KEY == "My test translation"
    }


    void "test show when resource file not found"() {
        def localeServiceMock= mockFor(LocaleService)
        localeServiceMock.demandExplicit.getLocaleStream(1) { String arg1 ->
            return null;
        };

        controller.localeService = localeServiceMock.createMock()

        when:
        params.lang = "en_US"
        controller.show()

        then:
        response.status ==  404
    }
}