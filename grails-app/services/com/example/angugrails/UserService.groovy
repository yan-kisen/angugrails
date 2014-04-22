package com.example.angugrails

import com.example.angugrails.auth.User

class UserService {

    def grailsApplication
    def springSecurityService
    def passwordEncoder

    /**
     * this creates a new user record with an active status. No email confirmation is implemented yet.
     * @param user parsed set of parameters for a new user.
     * @return created user, or a user with errors enumerated.
     */
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


    /**
     * At the moment, a user can update its password, but can not change any other users.
     * The user must verify the current password to help prevent somebody else from doing this.
     */
    User updateCurrentUser(String currentPassword, String newPassword) {
        User resp = null
        def currentUser = springSecurityService.getCurrentUser()
        def isAuthorized = passwordEncoder.isPasswordValid(currentUser.password, currentPassword, null)
        if (isAuthorized) {
            resp = changePassword(currentUser, newPassword)
        }
        resp
    }



    private User changePassword(User user, String newPassword) {
        user.setPassword(newPassword)
        if (user.hasErrors()) {
            log.error("user has errors after setting password.")
        } else {
            user.save(flush: true)
        }
        return user
    }


}
