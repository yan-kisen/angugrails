package steps

import com.example.angugrails.auth.User
import pages.HomePage
import geb.*

import static cucumber.api.groovy.EN.*


/**
 * When user goes to "[relative url]".
 *
 * Open the url at http://localhost:8080/angugrails/[relative url]
 */
When(~'^test loads new user with username: "([^"]*)" email: "([^"]*)" password: "([^"]*)"$') {
    String username, String email, String password ->
        def user = new User(username: username, email: email, password: password, enabled: true, accountLocked: false)
        if (!user.validate()) {
            throw new Exception("unexpected error.")
        } else {
            user.save(flush: true)
            def debug = User.findByUsername("user1")
            debug.username
        }
}