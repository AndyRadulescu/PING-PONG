package com.example.pingpong

import com.example.pingpong.data.BALL_DIAMETER
import com.example.pingpong.data.GAME_AREA_HEIGHT
import com.example.pingpong.data.GameState

fun calculateNextBallPosition(gameState: GameState): Unit {
    gameState.ballVector.y -= 10
    endGame(gameState)
}

fun endGame(gameState: GameState) {
    if (gameState.ballVector.y >= GAME_AREA_HEIGHT - BALL_DIAMETER / 2
        || gameState.ballVector.y + BALL_DIAMETER / 2 <= 0
    ) {
        gameState.isGameFinished = true
    }
}

fun bounceWallRight(){}
fun bounceWallLeft(){}
fun bounceRacketWithAngle(){}
