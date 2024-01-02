package com.example.pingpong.data

data class BallVector(
    var x: Int = GAME_AREA_WIDTH / 2 - BALL_DIAMETER / 2,
    var y: Int = GAME_AREA_HEIGHT / 2 - BALL_DIAMETER / 2
)

data class PlayerRacket(var x: Int = 375)

data class GameState(
    val roomId: String,
    val ballVector: BallVector,
    var player1: PlayerRacket,
    var player2: PlayerRacket
) {
    companion object {
        fun newGame(roomId: String): GameState {
            return GameState(
                roomId = roomId,
                ballVector = BallVector(),
                player1 = PlayerRacket(),
                player2 = PlayerRacket()
            )
        }
    }
}

data class UpdatePlayerDto(val player1: PlayerRacket?, val player2: PlayerRacket?)
