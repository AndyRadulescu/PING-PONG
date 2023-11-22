package com.example.pingpong.controller

import com.example.pingpong.config.TaskSchedulingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class TaskController {
    @Autowired
    private lateinit var taskScheduler: TaskSchedulingService

    @GetMapping("/addTask")
    fun addTask(): UUID {
        return taskScheduler.addTimer(
            object : TimerTask() {
                override fun run() {
                    println("somePrinters....")
                }
            })
    }

    @GetMapping("/cancelTask/{taskId}")
    fun cancelTask(@PathVariable taskId: UUID): Map<String, Boolean> {
        taskScheduler.cancelTimer(taskId)
        return mapOf("canceled" to true)
    }
}
