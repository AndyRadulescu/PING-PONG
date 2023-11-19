package com.example.pingpong.data


data class TaskDefinition(
    val cronExpression: String? = null,
    val actionType: String? = null,
    val data: String? = null
)
