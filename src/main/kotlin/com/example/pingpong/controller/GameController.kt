package com.example.pingpong.controller

import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import java.util.*

@Controller
class GameController {

    @MessageMapping("/msg/{id}")
    @SendTo("/topic/{id}")
    fun receiveMessage(@DestinationVariable id: String, message: String): String {
        println(id)
        return message
    }
}
