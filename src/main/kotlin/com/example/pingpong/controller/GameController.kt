package com.example.pingpong.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class GameController {

    @MessageMapping("/msg")
    @SendTo("/topic/ball")
    fun receiveMessage(message: String): String {
        println(message)
        return message;
    }
}
