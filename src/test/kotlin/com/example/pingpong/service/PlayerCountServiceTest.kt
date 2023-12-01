package com.example.pingpong.service

import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class PlayerCountServiceTest {
    private val playerCountService = mockk<PlayerCountService>(relaxed = true)

    private val SOME_ROOM_ID = "4FSS"

//    @BeforeEach()
//    fun before() {
//        playerCountService.counterMap = mutableMapOf()
//    }
//
//    @Test
//    fun `test default map to be 0 length`() {
//        assertEquals(0, playerCountService.counterMap.size)
//    }

    @Test
    fun `add player to map`() {
        val addedPlayer = playerCountService.addPlayer()
        assertEquals(1, playerCountService.counterMap)
    }

    @Test
    fun `remove player from map`() {
        val addedPlayer = playerCountService.removePlayer("4FSS")
        assertEquals(1, playerCountService.counterMap)
    }
}
