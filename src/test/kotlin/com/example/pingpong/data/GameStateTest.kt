package com.example.pingpong.data

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class GameStateTest {
    val ROOM_ID = "4SFA"

    @Test
    fun `test default init of GameState`() {
        val gameState = GameState.newGame(ROOM_ID)
        assertEquals(
            gameState,
            GameState(
                roomId = ROOM_ID,
                ballVector = BallVector(x = 485, y = 285),
                player1 = PlayerRacket(x = 375),
                player2 = PlayerRacket(x = 375)
            )
        )
    }
}
