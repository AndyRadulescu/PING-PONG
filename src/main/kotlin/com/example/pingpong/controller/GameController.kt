package com.example.pingpong.controller

import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class GameController {

    @MessageMapping("/msg/{name}")
    @SendTo("/topic/{name}")
    fun receiveMessage(/*@DestinationVariable name: String,*/ message: String): String {
        println(message)
        return message
    }
}
