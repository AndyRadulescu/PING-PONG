package com.example.pingpong

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication
class PingPongApplication

fun main(args: Array<String>) {
    runApplication<PingPongApplication>(*args)
}
