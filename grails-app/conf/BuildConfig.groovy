grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.work.dir = "target/work"
grails.project.target.level = 1.7
grails.project.source.level = 1.7
grails.project.dependency.resolver = "maven"
//grails.project.war.file = "target/${appName}-${appVersion}.war"



grails.project.dependency.resolver = "maven" // or ivy
grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // specify dependency exclusions here; for example, uncomment this to disable ehcache:
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
    legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    repositories {
        inherits true // Whether to inherit repository definitions from plugins

        grailsPlugins()
        grailsHome()
        mavenLocal()
        grailsCentral()
        mavenCentral()

        // for spring security plugin.
        mavenRepo "http://repo.spring.io/milestone/"
        // uncomment these (or add new ones) to enable remote dependency resolution from public Maven repositories
        mavenRepo "http://repository.codehaus.org"
        mavenRepo "http://download.java.net/maven/2/"
        // mavenRepo 'https://oss.sonatype.org/content/repositories/snapshots'
    }

    def gebVersion = "0.9.2"
    def seleniumVersion = "2.41.0"

    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes e.g.
        // runtime 'mysql:mysql-connector-java:5.1.27'

        // runtime 'org.postgresql:postgresql:9.3-1100-jdbc41'
        compile "org.apache.httpcomponents:httpclient:4.3.3"
        compile "xml-apis:xml-apis:1.4.01"
        compile "org.codehaus.groovy.modules.remote:remote-transport-http:0.5"
        test "org.codehaus.groovy.modules.http-builder:http-builder:0.7.1", {
            excludes 'xml-apis', 'httpclient'
        }
        test "org.seleniumhq.selenium:selenium-htmlunit-driver:$seleniumVersion"
        compile "org.seleniumhq.selenium:selenium-chrome-driver:$seleniumVersion"
        compile "org.seleniumhq.selenium:selenium-firefox-driver:$seleniumVersion"
        test "org.gebish:geb-junit4:$gebVersion"
    }

    plugins {
        // plugins for the build system only
        compile ":tomcat:7.0.52.1"

        compile ":twitter-bootstrap:3.1.1"

        compile ":spring-security-rest:1.3.2",  {
            excludes 'spring-security-core', 'cors'
        }

        // plugins for the compile step
        compile ":scaffolding:2.0.3"
        compile ':cache:1.1.1'

        compile ':spring-security-core:2.0-RC2'

        compile ":remote-control:1.4"
        compile ":cucumber:0.10.0"
        test ":geb:$gebVersion"


        // plugins needed at runtime but not for compilation
        runtime ":hibernate:3.6.10.13" // or ":hibernate4:4.3.4"
        runtime ":database-migration:1.4.0"
        runtime ":jquery:1.11.0.2"
        runtime ":resources:1.2.7"

        // Uncomment these (or add new ones) to enable additional resources capabilities
        //runtime ":zipped-resources:1.0.1"
        //runtime ":cached-resources:1.1"
        //runtime ":yui-minify-resources:0.1.5"
    }
}
