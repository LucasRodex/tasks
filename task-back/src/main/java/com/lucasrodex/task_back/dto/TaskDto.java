package com.lucasrodex.task_back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucasrodex.task_back.enums.TaskPriority;
import com.lucasrodex.task_back.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;

    // CORREÇÃO AQUI: Mudamos para LocalDate e adicionamos a formatação no lugar certo
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private LocalDateTime createdAt;

    // Construtor vazio (Necessário para o Jackson/JSON funcionar!)
    public TaskDto() {
    }

    // Construtor com argumentos atualizado para LocalDate
    public TaskDto(Long id, String title, String description, TaskStatus status,
                   TaskPriority priority, LocalDate dueDate, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    // Atualizado para LocalDate
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Atualizado para LocalDate
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}