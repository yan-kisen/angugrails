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


    void "Test that a UserRole can be created and associate a user with a role authority"() {

        when: 'a user and a role have been created and associated via a UserRole'
        def u = new User(username: "user", email: 'test@example.com', password: 'blahblah').save()
        def r = new Role(authority: "admin").save()
        def ur = UserRole.create(u, r)

        then: 'the UserRole validation passes and is saved to the datastore'
        ur.validate()
        ur.save()

        when: 'the user created above is refetched from the datastore'
        u = User.findByUsername("user")

        then: 'the user is associated with the admin role'
        u.authorities.size() == 1
        u.authorities[0].authority == "admin"

    }
}