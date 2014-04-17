dataSource {
    pooled = true
    driverClassName = "com.mysql.jdbc.Driver"
    dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}

// environment specific settings
environments {
    development {
        dataSource {
            url = "jdbc:mysql://grailsvm/angrails?useUnicode=yes&characterEncoding=UTF-8"
            username = "angrails"
            password = "angrails"
        }
        hibernate {
            show_sql = true
        }
    }
    test {
        dataSource {
            dbCreate = "create" // one of 'create', 'create-drop','update'
            url = "jdbc:mysql://grailsvm/angrails_test?useUnicode=yes&characterEncoding=UTF-8"
            username = "angrails_test"
            password = "angrails_test"
        }
        hibernate {
            show_sql = true
        }
    }
    production {
        dataSource {

        }
    }
}
