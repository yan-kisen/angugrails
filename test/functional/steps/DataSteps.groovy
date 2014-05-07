package steps

import com.example.angugrails.auth.User
import pages.HomePage
import geb.*

import static cucumber.api.groovy.EN.*


Given(~'^the db is reset') { ->
    User.findAll().each {
        it.delete(flush: true)
    }
}


/**
 * When user goes to "[relative url]".
 *
 * Open the url at http://localhost:8080/angugrails/[relative url]
 */
When(~'^the db is loaded with new user. username: "([^"]*)" email: "([^"]*)" password: "([^"]*)"$') {
    String username, String email, String password ->
        def user = new User(username: username, email: email, password: password, enabled: true, accountLocked: false)
        if (!user.validate()) {
            throw new Exception("unexpected error.")
        } else {
            user.save(flush: true)
        }
}