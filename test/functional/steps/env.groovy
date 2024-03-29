package steps

import geb.Browser
import geb.binding.BindingUpdater

import static cucumber.api.groovy.Hooks.*


Before () {
    // resetDatabase is a method on the 'World' object which is accessible to all cucumber features.
    resetDatabase()
    bindingUpdater = new BindingUpdater(binding, new Browser())
    bindingUpdater.initialize()
}

After () {
    bindingUpdater.remove ()
}