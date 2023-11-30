package com.example.pingpong.service

import org.springframework.stereotype.Service

@Service
class PlayerCountService {
    private val counterMap = mutableMapOf<String, Int>()

    fun addPlayerToRoom(id: String): Int {
        counterMap[id] = (counterMap[id]?.plus(1)) ?: 0
        return counterMap[id]!!
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
