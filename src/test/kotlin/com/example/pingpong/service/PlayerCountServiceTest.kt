package com.example.pingpong.service

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test


class PlayerCountServiceTest {
    private val playerCountService = PlayerCountService()
    private val ROOM_ID = "4FSS"

    @Nested
    inner class AddPlayer {
        @BeforeEach()
        fun before() {
            playerCountService.counterMap.remove(ROOM_ID)
        }

        @Test
        fun `test default map to be 0 length`() {
            assertEquals(0, playerCountService.counterMap.size)
        }

        @Test
        fun `add player to map`() {
            playerCountService.addPlayer(ROOM_ID)
            assertEquals(1, playerCountService.counterMap[ROOM_ID])
        }

        @Test
        fun `add 2 players to map`() {
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            assertEquals(2, playerCountService.counterMap[ROOM_ID])
        }

        @Test
        fun `max number of players is 2`() {
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            assertEquals(2, playerCountService.counterMap[ROOM_ID])
        }
    }

    @Nested
    inner class RemovePlayer {
        @Test
        fun `remove 1 player from map`() {
            playerCountService.counterMap[ROOM_ID] = 2
            playerCountService.removePlayer(ROOM_ID)
            assertEquals(mapOf(ROOM_ID to 1), playerCountService.counterMap)
        }

        @Test
        fun `remove 2 players from map`() {
            playerCountService.counterMap[ROOM_ID] = 2
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.removePlayer(ROOM_ID)
            assertEquals(emptyMap<String, Int>(), playerCountService.counterMap)
        }

        @Test
        fun `remove 2 players and add 1 from map`() {
            playerCountService.counterMap[ROOM_ID] = 2
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            assertEquals(mapOf(ROOM_ID to 1), playerCountService.counterMap)
        }

        @Test
        fun `remove 2 players and add 4 from map`() {
            playerCountService.counterMap[ROOM_ID] = 2
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            playerCountService.addPlayer(ROOM_ID)
            assertEquals(mapOf(ROOM_ID to 2), playerCountService.counterMap)
        }

        @Test
        fun `remove 2 players from map which contains only 1`() {
            playerCountService.counterMap[ROOM_ID] = 1
            playerCountService.removePlayer(ROOM_ID)
            playerCountService.removePlayer(ROOM_ID)
            assertEquals(emptyMap<String, Int>(), playerCountService.counterMap)
        }
    }

}
