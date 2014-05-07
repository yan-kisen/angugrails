package data

import com.example.angugrails.auth.User


class Data {
    static void clearData () {
        User.findAll()*.delete (flush: true)
    }

    static def userData = [
            [username: "user1", email: "testuser1@example.com", password: 'testpassword1'],
            [username: "user2", email: "testuser2@example.com", password: 'testpassword2'],
            [username: "user3", email: "testuser3@example.com", password: 'testpassword3'],
            [username: "user4", email: "testuser4@example.com", password: 'testpassword4'],
            [username: "user5", email: "testuser5@example.com", password: 'testpassword5']

    ]

    static public def findUserByUsername(String username) {
        userData.find { user ->
            user.username == username
        }
    }
}
