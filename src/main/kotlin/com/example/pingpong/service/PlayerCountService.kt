package com.example.pingpong.service

import org.springframework.stereotype.Service

@Service
class PlayerCountService {
    var counterMap = mutableMapOf<String, Int>()

    fun addPlayer(roomId: String): Int {
        counterMap[roomId] = counterMap[roomId]?.plus(1) ?: 1
        if (counterMap[roomId]!! >= 2) {
            counterMap[roomId] = 2
        }
        return counterMap[roomId]!!
    }

    fun removePlayer(id: String): Int {
        if (counterMap.contains(id) || counterMap[id]!! >= 1) {
            counterMap.remove(id)
            return counterMap[id]!!
        }
        counterMap[id] = counterMap[id]?.minus(1) ?: 0
        return 0
    }
}
