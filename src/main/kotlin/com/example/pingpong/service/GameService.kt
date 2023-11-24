package com.example.pingpong.service

import com.example.pingpong.data.GameState


class GameService(private var gameStatus: GameState) {
    fun updateGameStatus(newGameStatus: GameState?): GameState {
        return gameStatus
    }
}
