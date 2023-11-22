package com.example.pingpong.controller

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.TaskScheduler
import org.springframework.stereotype.Controller
import java.util.*

@Controller
class GameController {

    @Autowired
    private lateinit var template: SimpMessagingTemplate

    @Autowired
    private lateinit var om: ObjectMapper

    @Autowired
    private lateinit var scheduler: TaskScheduler

    @MessageMapping("/msg/{name}")
    @SendTo("/topic/{name}")
    fun receiveMessage(@DestinationVariable name: String, message: String): String {
        println(name)
        return message
    }
}
