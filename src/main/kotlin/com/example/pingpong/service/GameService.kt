package com.example.pingpong.service

import com.example.pingpong.data.GameState
import org.springframework.stereotype.Service


@Service
class GameService {

    val games = mutableMapOf<String, GameState>()

    fun newGame(roomId: String): GameState {
        val newGame = GameState.newGame(roomId)
        games[roomId] = newGame
        return newGame
    }

    fun updateGameStatus(roomId: String): GameState {
        return games[roomId] ?: GameState.newGame(roomId)
    }
}
