package com.example.pingpong.config

import com.example.pingpong.data.TaskDefinition
import org.springframework.stereotype.Service


@Service
class TaskDefinitionBean : Runnable {
    private var taskDefinition: TaskDefinition? = null
    override fun run() {
        println("Running action: " + taskDefinition?.actionType)
        println("With Data: " + taskDefinition?.data)
    }

    fun getTaskDefinition(): TaskDefinition? {
        return taskDefinition
    }

    fun setTaskDefinition(taskDefinition: TaskDefinition?) {
        this.taskDefinition = taskDefinition
    }
}
