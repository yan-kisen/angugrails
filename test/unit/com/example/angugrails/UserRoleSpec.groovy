package com.example.angugrails

import com.example.angugrails.auth.Role
import com.example.angugrails.auth.User
import com.example.angugrails.auth.UserRole

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(UserRole)
@Mock([User, Role])
class UserRoleSpec extends Specification {
    // most testing for this domain class will be in the integration tests.

    void "Test that a UserRole can be created"() {
        when: 'a user and a role have been created and associated via a UserRole'
        def u = new User(username: "user", email: 'test@example.com', password: 'blahblah')
        def r = new Role(authority: "admin")
        def ur = UserRole.create(u, r)

        then: 'the UserRole validation passes'
        ur.validate()
    }
}