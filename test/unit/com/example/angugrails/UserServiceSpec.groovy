package com.example.angugrails

import com.example.angugrails.auth.User
import grails.test.mixin.Mock;
import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(UserService)
@Mock([User])
class UserServiceSpec {

    void "test createAndRegisterNewUser happy path"() {

        given: "New user parameters"
        User user = new User(username: "testuser", email: "testuser@example.com", password: "testpassword")

        when:
        User resp = service.createAndRegisterNewUser(user)

        then:
        resp.errors == null
        resp.username == "testuser"
        resp.email == "testuser@example.com"
        resp.accountExpired == false
        resp.accountLocked == false
        resp.enabled == true

    }


    void "test createAndRegisterNewUser invalid missing username"() {
        given: "New user parameters"
        User user = new User(email: "testuser@example.com", password: "testpassword")

        when:
        User resp = service.createAndRegisterNewUser(user)

        then:
        resp.errors.errorCount == 1
        resp.errors.allErrors[0].field == "username"
    }


    // TBD: not sure how to unit test UserService.updateCurrentUser, it will get tested during integration test.

}
