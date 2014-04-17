package com.example.angugrails

import grails.plugin.springsecurity.annotation.Secured
import org.apache.commons.io.IOUtils

class LocaleController {

    def index() {}

    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def show() {
        // return the json file for the provided locale, or the default locale if one is not provided.
        def lang = params.lang
        def localeFilename = "locales/" + lang + ".json"
        log.debug("Going to open locale file: " + localeFilename)
        InputStream iStream = this.class.getClassLoader().getResourceAsStream(localeFilename)
        if (!iStream) {
            log.error("LocaleFile not found: " + localeFilename)
            render(content: 'Unable to find translation file.', contentType: 'application/text')
        }  else {
            render (contentType: 'application/json', file: iStream)
        }
    }
}
