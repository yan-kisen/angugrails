package pages


import geb.*

class HomePage extends Page {
    static url = "home"

    static at = { title == "Angular Grails Sample" }

    static content = {
    }
}