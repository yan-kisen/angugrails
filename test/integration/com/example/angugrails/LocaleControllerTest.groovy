package com.example.angugrails

import com.example.angugrails.LocaleController
import groovy.util.GroovyTestCase

public class LocaleControllerTest extends GroovyTestCase {

    void testGetTranslationForEnglish() {
        def lc = new LocaleController()
        lc.params.lang = "en_US"
        lc.show()
        assert lc.response.status == 200
        assert lc.response.contentAsByteArray.size() == 3897
        assert lc.response.getContentType()  == "application/json;charset=UTF-8"
    }
}