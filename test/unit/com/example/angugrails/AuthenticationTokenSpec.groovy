package com.example.angugrails

import com.example.angugrails.auth.AuthenticationToken
import com.example.angugrails.auth.User
import grails.test.mixin.TestFor
import spock.lang.Specification


/**
 * Not much to test here, maybe there should be constraints on this domain object but none at the moment.
 */
@TestFor(AuthenticationToken)
class AuthenticationTokenSpec extends Specification {

    void "Test that authentication token has a username and token attribute"() {
        when: 'a new authentication token is created'
        def a = new AuthenticationToken(username: "test", tokenValue: "xxxxx")

        then: 'validation should pass'
        a.validate()

    }
}