package com.example.pingpong.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Default {
    @GetMapping("/")
    fun getVersion(): Map<String, Int> {
        return mapOf("version" to 1)
    }
}
