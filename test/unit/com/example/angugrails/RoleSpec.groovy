package com.example.angugrails

import com.example.angugrails.auth.Role
import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(Role)
class RoleSpec extends Specification {

    // TBD: test uniqueness contraints in integration test.

    void "Test that role authority must not be blank or null"() {
        when: 'the authority is null'
        def r = new Role(authority: null)

        then: 'validation should fail'
        !r.validate()

        when: 'the authority is blank'
        r.authority = ''

        then: 'validation should fail'
        !r.validate()

        when: 'the authority has a nonblank value'
        r.authority = 'ADMIN'

        then: 'validation should pass'
        r.validate()
    }
}