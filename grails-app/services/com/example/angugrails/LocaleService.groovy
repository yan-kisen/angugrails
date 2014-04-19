package com.example.angugrails


class LocaleService {

    def getLocaleStream(def locale) {
        def localeFilename = "locales/" + locale + ".json"

        def iStream = this.class.getClassLoader().getResourceAsStream(localeFilename)
        if (!iStream) {
            log.error("locale file not found: " + localeFilename)
        }
        return iStream
    }
}
