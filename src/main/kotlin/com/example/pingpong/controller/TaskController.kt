package com.example.pingpong.controller

import com.example.pingpong.service.GameService
import com.example.pingpong.service.TaskSchedulingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@CrossOrigin(origins = ["*"])
class TaskController {

    @Autowired
    private lateinit var template: SimpMessagingTemplate

    @Autowired
    private lateinit var taskScheduler: TaskSchedulingService

    @Autowired
    private lateinit var gameService: GameService

    @GetMapping("/addTask/{roomId}")
    fun addTask(@PathVariable roomId: String): UUID {
        gameService.newGame(roomId);
        return taskScheduler.addTimer(
            object : TimerTask() {
                override fun run() {
                    println("somePrinters....")
                    val newGameState = gameService.updateGameStatus(roomId)
                    template.convertAndSend("/topic/$roomId", newGameState)
                }
            })
    }

    @GetMapping("/cancelTask/{taskId}")
    fun cancelTask(@PathVariable taskId: UUID): Map<String, Boolean> {
        taskScheduler.cancelTimer(taskId)
        return mapOf("canceled" to true)
    }
}
