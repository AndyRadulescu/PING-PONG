package com.example.pingpong.controller

import com.example.pingpong.data.BallVector
import com.example.pingpong.data.GameState
import com.example.pingpong.data.PlayerRacket
import com.example.pingpong.service.GameService
import com.example.pingpong.service.TaskSchedulingService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class TaskController {

    @Autowired
    private lateinit var template: SimpMessagingTemplate

    @Autowired
    private lateinit var om: ObjectMapper

    @Autowired
    private lateinit var taskScheduler: TaskSchedulingService

    @GetMapping("/addTask/{roomId}")
    fun addTask(@PathVariable roomId: String): UUID {
        val gameService = GameService(
            GameState(
                roomId,
                ballVector = BallVector(),
                player1 = PlayerRacket(),
                player2 = PlayerRacket()
            )
        )
        return taskScheduler.addTimer(
            object : TimerTask() {
                override fun run() {
                    println("somePrinters....")
                    val newGameStatus = gameService.updateGameStatus(null)
                    template.convertAndSend("/topic/$roomId", newGameStatus)
                }
            })
    }

    @GetMapping("/cancelTask/{taskId}")
    fun cancelTask(@PathVariable taskId: UUID): Map<String, Boolean> {
        taskScheduler.cancelTimer(taskId)
        return mapOf("canceled" to true)
    }
}
