package com.example.angugrails

import grails.transaction.Transactional
import com.example.angugrails.auth.User

@Transactional
class TestDataService {
    def reset() {
        User.findAll()*.delete (flush: true)
    }
}
