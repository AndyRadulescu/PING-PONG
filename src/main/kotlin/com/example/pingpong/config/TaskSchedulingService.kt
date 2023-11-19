package com.example.pingpong.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.TaskScheduler
import org.springframework.scheduling.support.CronTrigger
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.ScheduledFuture

@Service
class TaskSchedulingService {
    @Autowired
    private lateinit var taskScheduler: TaskScheduler
    var jobsMap = mutableMapOf<String, ScheduledFuture<*>?>()

    fun scheduleATask(jobId: String, tasklet: Runnable?, cronExpression: String) {
        println("Scheduling task with job id: $jobId and cron expression: $cronExpression")
        val scheduledTask = taskScheduler.schedule(
            tasklet!!,
            CronTrigger(cronExpression, TimeZone.getTimeZone(TimeZone.getDefault().id))
        )
        jobsMap[jobId] = scheduledTask
    }

    fun removeScheduledTask(jobId: String?) {
        if (jobId == null) {
            return
        }

        val scheduledTask = jobsMap[jobId]
        if (scheduledTask != null) {
            scheduledTask.cancel(true)
            jobsMap[jobId] = null
        }
    }
}
