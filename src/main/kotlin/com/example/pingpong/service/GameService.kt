package com.example.pingpong.service

import com.example.pingpong.calculateNextBallPosition
import com.example.pingpong.data.GameState
import com.example.pingpong.data.UpdatePlayerDto
import org.springframework.stereotype.Service

@Service
class GameService {

    val games = mutableMapOf<String, GameState>()

    fun newGame(roomId: String): String {
        val newGame = GameState.newGame(roomId)
        games[roomId] = newGame
        return roomId
    }

    fun updateGameStatus(roomId: String): GameState {
        val updatedGame = games[roomId] ?: GameState.newGame(roomId)
        calculateNextBallPosition(updatedGame)
        return updatedGame
    }

    fun updatePlayerRacket(roomId: String, updatePlayer: UpdatePlayerDto) {
        if (updatePlayer.player1 != null) {
            games[roomId]?.player1 = updatePlayer.player1
        }
        if (updatePlayer.player2 != null) {
            games[roomId]?.player2 = updatePlayer.player2
        }
    }

    fun removeGame(roomId: String): GameState? {
        return games.remove(roomId)
    }
}
