package com.example.angugrails

import grails.plugin.springsecurity.annotation.Secured

class LocaleController {

    def localeService

    def index() {}

    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def show() {
        def lang = params.lang

        InputStream iStream = localeService.getLocaleStream(lang)

        if (!iStream) {
            render(status: 404)
        }  else {
            render (contentType: 'application/json', file: iStream)
        }
    }
}
