class UrlMappings {

	static mappings = {

        /*
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        */

        "/home" {
            controller = "home"
            action = "index"
        }

        "/api/locale"(controller: "locale") {
            action = [GET: "show"]
        }

        "/api/user"(controller: "user", parseRequest: true) {
            action = [GET: "list", POST: "save", PUT: "update", DELETE: "update"]
        }

        "/"(view:"/index")
        "500"(view:'/error')

	}
}
