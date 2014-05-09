package steps
import data.Data
import grails.plugin.remotecontrol.RemoteControl


class UsersWorld {

    Long setupUser (String username) {
        def remote = new RemoteControl ()

        def userData = Data.findUserByUsername (username)
        Long id = remote {
            ctx.userService.createAndRegisterNewUser(userData.username, userData.email, userData.password)?.id
        } as Long

        assert id
        id
    }
}
