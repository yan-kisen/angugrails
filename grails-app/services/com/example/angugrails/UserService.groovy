package com.example.angugrails

import grails.validation.ValidationException
import com.example.angugrails.auth.User
import com.example.angugrails.auth.Role
import com.example.angugrails.auth.UserRole

class UserService {

    def grailsApplication
    def springSecurityService


    User createAndRegisterNewUser(User user) {

        user.accountLocked = grailsApplication.config.application.registration.emailConfirm
        user.enabled = true
        if (!user.validate()) {
            log.info("User create failed. Reason: " + user.errors)
        } else {
            if (!user.save()) {
                log.error("Unexpected fatal error. Unable to create new user.")
                throw new Exception("Unexpected error, invalid user null returned from save.")
            }
        }
        return user
    }



    User changePassword(User user, String currentPassword, String newPassword) {
        /*
        if (springSecurityService.encodePassword(currentPassword) != user.getPassword()) {
            log.error("current password is not valid." + currentPassword + "against " + user.getPassword())
            throw new ValidationException("Current password is not valid.")
        }
        */

        user.setPassword(newPassword)
        if (user.hasErrors()) {
            log.error("user has errors after setting password.")
        } else {
            user.save(flush: true)
        }
        return user
    }


}
