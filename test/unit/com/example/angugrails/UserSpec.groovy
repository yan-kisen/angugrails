package com.example.angugrails

import com.example.angugrails.auth.User
import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(User)
class UserSpec extends Specification {

    void "Test that username must not be null"() {
        when: 'the username is null'
        def u = new User(username: null, email: 'test@example.com', password: 'blahblah')

        then: 'validation should fail'
        !u.validate()

        when: 'the name is not null'
        u = new User(username: 'test', email: 'test@example.com', password: 'blahblah')

        then: 'validation should pass'
        u.validate()
    }

    void "Test that the username must be at least 3 characters long"() {
        when: 'the username is only 2 characters long'
        def u = new User(username: 'bo', email: 'test@example.com', password: 'blahblah')

        then: 'validation should fail'
        !u.validate()

        when: 'then name is longer than 2 characters'
        u = new User(username: 'bob', email: 'test@example.com', password: 'blahblah')

        then: 'validation should pass'
        u.validate()
    }


    // unique constraints will be tested in integration tests

    void "Test that the email address must not be blank and be formatted as an email address"() {
        when: 'a user is created with a blank email address'
        def u = new User(username: 'sample', email: '', password: 'blahblah')

        then: 'the user validation should fail'
        !u.validate()

        when: 'the email address is set to a non-valid email address'
        u.email = 'bob.com'

        then: 'the user validation should fail'
        !u.validate()

        when: 'then email address is set to a valid email address'
        u.email = 'billy@bob.com'

        then: 'the user validation should pass'
        u.validate()
    }

    void "Test that the password must not be blank and it must be at least 5 characters long"() {
        when: 'a user is created with a blank password'
        def u = new User(username: 'sample', email: 'sample@example.com', password: '')

        then: 'the user validation should fail'
        !u.validate()

        when: 'the password is set to a string of only 4 characters'
        u.password = '1234'

        then: 'the user validation should fail'
        !u.validate()

        when: 'the password is set to a string of 5 characters'
        u.password = '12345'

        then: 'the user validation should pass'
        u.validate()
    }

}