package com.example.pingpong.controller

import com.example.pingpong.service.PlayerCountService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import java.util.*

@Controller
class GameController {

    @Autowired
    private lateinit var playerCount: PlayerCountService

    @MessageMapping("/msg/{id}")
    @SendTo("/topic/msg/{id}")
    fun receiveMessage(@DestinationVariable id: String, message: String): String {
        println(id)
        return message
    }

    @MessageMapping("/count/{id}")
    @SendTo("/topic/count/{id}")
    fun receiveCount(@DestinationVariable id: String, counter: String): Int {
        println(counter)
        if (counter == "add") {
            return playerCount.addPlayer(id)
        }
        return playerCount.removePlayer(id)
    }
}
