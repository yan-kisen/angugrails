package world

import grails.plugin.remotecontrol.RemoteControl
import static cucumber.api.groovy.Hooks.World


class AngugrailsWorld {
    def binding

    AngugrailsWorld (def binding) {
        this.binding = binding
    }

    void resetDatabase () {
        def remote = new RemoteControl ()

        boolean success = remote {
            ctx.testDataService.reset ()
            true
        }
        assert success
    }
}

World () {
    def world = new AngugrailsWorld (binding)
    world.metaClass.mixin Users
    world
}