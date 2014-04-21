package com.example.angugrails

import com.example.angugrails.auth.User
import grails.test.mixin.Mock;
import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(UserController)
@Mock([User])
class UserControllerSpec extends Specification {

    void setupSpec() {

    }

    void "test show not implemented yet, forbidden"() {
        when:
        params.id = "1"
        params.username = "bob"
        params.email = "bob"
        controller.show()

        then:
        response.status ==  403
    }


    void "test save user happy path"() {
        def userServiceMock= mockFor(UserService)
        userServiceMock.demandExplicit.createAndRegisterNewUser(1) { User arg1 ->
            return arg1
        }

        controller.userService = userServiceMock.createMock()

        when:
        request.json = """{
            "username": "testname",
            "email": "testing@example.com",
            "password":"testpw"
            }"""
        request.method = "POST"
        controller.save()

        then:
        response.status ==  200
        response.json.username == "testname"
        response.json.email == "testing@example.com"
        response.json.password == "testpw"

    }

    void "test save user validation fails"() {
        def userServiceMock= mockFor(UserService)
        userServiceMock.demandExplicit.createAndRegisterNewUser(1) { User arg1 ->
            arg1.validate()
            return arg1
        }

        def debug = userServiceMock.createMock()
        controller.userService = debug

        when:
        request.json = """{
            "username": "",
            "email": "testing@example.com",
            "password":"testpw"
            }"""
        request.method = "POST"
        controller.save()

        then:
        response.status ==  422
        response.json.errors[0].field == "username"
        response.json.errors.size() == 1
    }

    void "test update password happy path"() {
        def userServiceMock= mockFor(UserService)
        userServiceMock.demandExplicit.updateCurrentUser(1) { String currentPassword, String newPassword ->
            def currentUser = new User(username: "test", email: "test@example.com", password: "encrypted")
            assert currentPassword == "blah"
            assert newPassword == "peep"
            return currentUser
        }

        controller.userService =  userServiceMock.createMock()

        when:
        request.json = """{
            "currentPassword": "blah",
            "password": "peep"
        }
        """
        request.method = "POST"
        controller.update()

        then:
        response.status == 200

    }

}