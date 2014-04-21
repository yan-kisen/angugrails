package com.example.angugrails

import com.example.angugrails.auth.User
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.*
import static org.springframework.http.HttpStatus.*
import static org.springframework.http.HttpMethod.*

@Transactional
class UserController  {
    static responseFormats = ['json', 'xml']
    def userService
    def passwordEncoder


    @Secured(['IS_AUTHENTICATED_FULLY'])
    def show(User user) {
        log.debug("In user show controller action.")

        render(status: 403)
    }


    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def save(User user) {
        User savedUser = userService.createAndRegisterNewUser(user)
        if (savedUser.hasErrors()) {
            respond savedUser.errors
        }  else {
            respond savedUser
        }
    }

    @Secured(['IS_AUTHENTICATED_FULLY'])
    def update() {
        def savedUser = userService.updateCurrentUser(request.JSON.currentPassword, request.JSON.password)
        if (savedUser.hasErrors()) {
            respond savedUser.errors
        } else {
            respond savedUser
        }
    }

    @Secured(['IS_AUTHENTICATED_FULLY'])
    def delete() {
        // not implemented yet
        render(status: 403)
    }
}
