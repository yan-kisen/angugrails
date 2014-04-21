package com.example.angugrails.auth

class User {

	transient springSecurityService

	String username
	String password
    String email
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

	static transients = ['springSecurityService']

	static constraints = {
		username blank: false, unique: true, minSize: 3
        email blank: false, unique: false, email: true // allow multiple usernames or aliases to share one email address.
		password blank: false, minSize: 5  // TBD: add more password validation.
	}

	static mapping = {
		password column: '`password`'
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
