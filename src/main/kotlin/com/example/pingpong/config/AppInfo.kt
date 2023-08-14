package com.example.pingpong.config

import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import org.springframework.context.annotation.PropertySources

@Configuration
@PropertySources(PropertySource("classpath:application.properties"))
class AppInfo {
    @Value("\${build.version}")
    private lateinit var appVersion: String

    @PostConstruct
    fun init() {
        print()
    }

    fun print() {
        println(" appVresion : $appVersion")
    }
}
