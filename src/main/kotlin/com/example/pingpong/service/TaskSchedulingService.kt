package com.example.pingpong.service

import com.example.pingpong.data.REFRESH_RATE
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskSchedulingService {
    val timerTasks: MutableMap<String, Timer> = HashMap()

    fun addTimer(roomId: String, task: TimerTask): String {
        val timer = Timer()
        timer.schedule(task, 0, REFRESH_RATE)
        timerTasks[roomId] = timer
        return roomId
    }

    fun cancelTimer(roomId: String) {
        timerTasks[roomId]?.let { timer ->
            timer.cancel()
            timerTasks.remove(roomId)
        }
    }
}
