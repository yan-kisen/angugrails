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
    def springSecurityService
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

    /**
     * Only the current user can be updated at the moment.
     * @return
     */
    @Secured(['IS_AUTHENTICATED_FULLY'])
    def update() {
        String currentPassword = request.JSON.currentPassword
        String newPassword = request.JSON.password
        User currentUser = springSecurityService.getCurrentUser()
        Boolean isAuthorized = passwordEncoder.isPasswordValid(currentUser.password, currentPassword, null)

        if (isAuthorized) {
            currentUser.password = newPassword
            if (currentUser.validate() && currentUser.save()) {
                respond currentUser
            } else {
                respond currentUser.errors
            }
        } else {
            render(status: 403)
        }
    }

    @Secured(['IS_AUTHENTICATED_FULLY'])
    def delete() {
        // not implemented yet
        render(status: 403)
    }
}
