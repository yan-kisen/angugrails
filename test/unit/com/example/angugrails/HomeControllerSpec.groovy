package com.example.angugrails;

import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(HomeController)
class HomeControllerSpec extends Specification {

    void "test index happy path does nothing interesting"() {
        when:
        controller.index()

        then:
        response.status ==  200
    }
}