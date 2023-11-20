package com.example.pingpong.controller

import com.example.pingpong.config.TaskDefinitionBean
import com.example.pingpong.config.TaskSchedulingService
import com.example.pingpong.data.TaskDefinition
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import java.util.UUID


@Controller
class GameController {

//    @Autowired
//    private lateinit var template: SimpMessagingTemplate

    @Autowired
    private lateinit var taskSchedulingService: TaskSchedulingService

    @Autowired
    private lateinit var taskDefinitionBean: TaskDefinitionBean

    @MessageMapping("/msg/{name}")
    @SendTo("/topic/{name}")
    fun receiveMessage(/*@DestinationVariable name: String,*/ message: String): String {
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

//    @Scheduled(fixedRate = 5000)
//    fun scheduleResponse() {
//        Thread.sleep(1000) // simulated delay
//        println("scheduled")
//        this.template.convertAndSend("/topic/CR51", "Hello");
//    }
}
