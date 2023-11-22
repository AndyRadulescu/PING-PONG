package com.example.pingpong.config

import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskSchedulingService {
    val timerTasks: MutableMap<UUID, Timer> = HashMap()

    fun addTimer(task: TimerTask): UUID {
        val timer = Timer()
        val taskId = UUID.randomUUID()
        timer.schedule(task, 20,1000)
        timerTasks[taskId] = timer
        return taskId
    }

    fun cancelTimer(uuid: UUID) {
        timerTasks[uuid]?.let { timer ->
            timer.cancel()
            timerTasks.remove(uuid)
        }
    }
}
