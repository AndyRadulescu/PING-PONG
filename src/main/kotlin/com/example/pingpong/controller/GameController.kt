package com.example.pingpong.controller

import com.example.pingpong.data.UpdatePlayerDto
import com.example.pingpong.service.GameService
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

    @Autowired
    private lateinit var taskController: TaskController

    @Autowired
    private lateinit var gameService: GameService

    @MessageMapping("/msg/{roomId}")
    @SendTo("/topic/msg/{roomId}")
    fun receiveMessage(@DestinationVariable roomId: String, playerDto: UpdatePlayerDto): UpdatePlayerDto {
        println(playerDto)
        this.gameService.updatePlayerRacket(roomId, playerDto)
        return playerDto
    }

    @MessageMapping("/count/{roomId}")
    @SendTo("/topic/count/{roomId}")
    fun receiveCount(@DestinationVariable roomId: String, counter: String): Int {
        println(counter)
        return if (counter == "add") {
            val playerCount = playerCount.addPlayer(roomId)
            if (playerCount == 2) {
                println("game started")
                taskController.addTask(roomId)
            }
            playerCount
        } else {
            val playerCount = playerCount.removePlayer(roomId)
            if (gameService.games.isNotEmpty()) {
                val keys = gameService.games.filterValues { game -> game.roomId == roomId }.keys
                taskController.cancelTask(keys.first())
            }
            playerCount
        }
    }
}
