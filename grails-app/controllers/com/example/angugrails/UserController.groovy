package com.example.angugrails

import com.example.angugrails.auth.User
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.*
import static org.springframework.http.HttpStatus.*
import static org.springframework.http.HttpMethod.*

@Transactional
class UserController  {
    static responseFormats = ['json', 'xml']

    def springSecurityService
    def userService
    def passwordEncoder


    @Secured(['IS_AUTHENTICATED_FULLY'])
    def show(User user) {
        log.debug("In user show controller action.")
        // respond user
        respond "forbidden"
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
        log.debug("In user update controller action.")
        def currentUser = springSecurityService.getCurrentUser()
        def isAuthorized = passwordEncoder.isPasswordValid(currentUser.password, request.JSON.password, null)
        if (isAuthorized) {
            def savedUser = userService.changePassword(currentUser, request.JSON.password, request.JSON.new_password)
            log.debug("Changed current user password")
            if (savedUser.hasErrors()) {
                respond savedUser.errors
            } else {
                respond savedUser
            }
        } else {
            // fix this to return errors instead.
            render(status: 403, text: 'Invalid current password.')
        }
    }

    @Secured(['IS_AUTHENTICATED_FULLY'])
    def delete() {
        log.debug("In user delete controller action.")
    }
}
