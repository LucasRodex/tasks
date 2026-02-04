package com.lucasrodex.task_back.service;

import com.lucasrodex.task_back.dto.TaskDto;
import com.lucasrodex.task_back.model.Task;
import com.lucasrodex.task_back.repository.TaskRepository;
import com.lucasrodex.task_back.enums.TaskStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<TaskDto> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDto) // Converte cada Entity para DTO
                .collect(Collectors.toList());
    }

    public List<Task> findByStatus(TaskStatus status) {
        return repository.findByStatus(status);
    }

    public TaskDto create(TaskDto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());


        task.setDueDate(taskDto.getDueDate());

        Task savedEntity = repository.save(task);
        return convertToDto(savedEntity);
    }

    public TaskDto update(Long id, TaskDto taskDto) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());
        task.setDueDate(taskDto.getDueDate());

        Task updated = repository.save(task);
        return convertToDto(updated);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
    private TaskDto convertToDto(Task entity) {
        return new TaskDto(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getPriority(),
                entity.getDueDate(),
                entity.getCreatedAt()
        );
    }
}