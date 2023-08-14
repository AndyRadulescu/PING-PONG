package com.example.pingpong.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Default {

    @Value("\${build.version}") lateinit var version: String

    @GetMapping("/")
    fun getVersion(): Map<String, String> {
        return mapOf("version" to version)
    }
}
