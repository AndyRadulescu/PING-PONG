package com.example.pingpong.service

import org.springframework.stereotype.Service

@Service
class PlayerCountService {
    var counterMap = mutableMapOf<String, Int>()

    fun addPlayer(): Int {
        val roomId =  "4FSS"
        println("WTF")
        if (!counterMap.containsKey(roomId)) {
            counterMap[roomId] = 0
        } else {
            counterMap[roomId] = counterMap[roomId]?.plus(1) ?: 0
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
