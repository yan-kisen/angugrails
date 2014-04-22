package support

import geb.Browser
import geb.binding.BindingUpdater

import static cucumber.api.groovy.Hooks.*

Before () {
    bindingUpdater = new BindingUpdater(binding, new Browser())
    bindingUpdater.initialize()
}

After () {
    bindingUpdater.remove ()
}