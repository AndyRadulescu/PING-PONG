package com.example.pingpong

import com.example.pingpong.data.BALL_DIAMETER
import com.example.pingpong.data.GAME_AREA_HEIGHT
import com.example.pingpong.data.GameState
import com.example.pingpong.data.RACKET_HEIGHT

fun calculateNextBallPosition(gameState: GameState): Unit {
    bounceRacketWithAnglePlayer1(gameState)
    gameState.ballVector.y += gameState.ballVector.velocityY
    endGame(gameState)
}

fun endGame(gameState: GameState) {
    if (gameState.ballVector.y >= GAME_AREA_HEIGHT - BALL_DIAMETER / 2
        || gameState.ballVector.y + BALL_DIAMETER / 2 <= 0
    ) {
        gameState.isGameFinished = true
    }
}

fun bounceWallRight() {}
fun bounceWallLeft() {}
fun bounceRacketWithAnglePlayer1(gameState: GameState) {
    if (gameState.ballVector.y >= GAME_AREA_HEIGHT - BALL_DIAMETER - RACKET_HEIGHT
        && (gameState.ballVector.x >= gameState.player1.x && gameState.player1.x <= gameState.player1.x + RACKET_HEIGHT)
    ) {
        gameState.ballVector.velocityY = -10;
    }
}
