package com.example.pingpong.controller

import com.example.pingpong.config.TaskDefinitionBean
import com.example.pingpong.config.TaskSchedulingService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.TaskScheduler
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import java.time.Duration
import java.util.*


@Controller
class GameController {

    @Autowired
    private lateinit var template: SimpMessagingTemplate

    @Autowired
    private lateinit var taskSchedulingService: TaskSchedulingService

    @Autowired
    private lateinit var taskDefinitionBean: TaskDefinitionBean

    @Autowired
    private lateinit var om: ObjectMapper

    @Autowired
    private lateinit var scheduler: TaskScheduler

    @MessageMapping("/msg/{name}")
    @SendTo("/topic/{name}")
    fun receiveMessage(@DestinationVariable name: String, message: String): String {
        println(name)
        this.scheduler.scheduleAtFixedRate(
            {
                run {
                    println("send message")
                    this.template.convertAndSend("/topic/$name", om.writeValueAsString("Hello"))
                }
            },
            Duration.ofMillis(20)
        )
        return message
    }

    @GetMapping(path = ["/remove/{jobId}"])
    fun removeJob(@PathVariable jobId: String?) {
        taskSchedulingService.removeScheduledTask(jobId)
    }

    @GetMapping(path = ["/taskdef"])
    fun scheduleATask() {
        taskDefinitionBean.setTaskDefinition(/*taskDefinition*/)
        taskSchedulingService.scheduleATask(
            UUID.randomUUID().toString(),
            taskDefinitionBean,
        )
    }
}
