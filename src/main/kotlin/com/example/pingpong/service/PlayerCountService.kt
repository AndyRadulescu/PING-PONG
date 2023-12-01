package com.example.pingpong.service

import org.springframework.stereotype.Service

@Service
class PlayerCountService {
    var counterMap = mutableMapOf<String, Int>()

    fun addPlayer(id: String): Int {
        if (counterMap[id] == null) {
            counterMap[id] = 0
        } else {
            counterMap[id] = counterMap[id]?.plus(1) ?: 0
        }
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
