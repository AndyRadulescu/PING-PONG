package com.example.pingpong

import com.example.pingpong.data.BallVector

fun calculateNextBallPosition(ballVector: BallVector): BallVector {
    ballVector.y += 10
    return ballVector
}

fun endGame(){

}

fun bounceWallRight(){}
fun bounceWallLeft(){}
fun bounceRacketWithAngle(){}
