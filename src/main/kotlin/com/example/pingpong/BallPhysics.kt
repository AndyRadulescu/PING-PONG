package com.example.pingpong

import com.example.pingpong.data.*

fun calculateNextBallPosition(gameState: GameState): Unit {
    bounceRacketWithAnglePlayer1(gameState)
    gameState.ballVector.y += gameState.ballVector.velocityY
    gameState.ballVector.x += gameState.ballVector.velocityX
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
    val ballX = gameState.ballVector.x
    val ballY = gameState.ballVector.y
    val ballDistanceOnRacket1 = ballOnRacketAngle(ballX, gameState.player1.x)
    val ballDistanceOnRacket2 = ballOnRacketAngle(ballX, gameState.player2.x)

    if (ballY >= GAME_AREA_HEIGHT - BALL_DIAMETER - RACKET_HEIGHT
        && ballDistanceOnRacket1 != -1
    ) {
        gameState.ballVector.velocityY = -10
        gameState.ballVector.velocityX = ballDistanceOnRacket1
    }

    if (ballY <= RACKET_HEIGHT
        && ballDistanceOnRacket2 != -1
    ) {
        gameState.ballVector.velocityY = +10
        gameState.ballVector.velocityX = ballDistanceOnRacket1
    }
}

fun ballOnRacketAngle(ballX: Int, racketX: Int): Int {
    val distanceOnRacket = ballX - racketX
    println(distanceOnRacket)
    if (distanceOnRacket in 0..50) {
        return 30
    }
    if (distanceOnRacket in 50..100) {
        return 10
    }
    if (distanceOnRacket in 100..150) {
        return 0
    }
    if (distanceOnRacket in 150..200) {
        return 10
    }
    if (distanceOnRacket in 200..250) {
        return 30
    }
    return -1
}
