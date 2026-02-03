package com.lucasrodex.task_back.service;

import com.lucasrodex.task_back.dto.TaskDto;
import com.lucasrodex.task_back.model.Task;
import com.lucasrodex.task_back.repository.TaskRepository;
import com.lucasrodex.task_back.enums.TaskStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    

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
        return new TaskDto(
                savedEntity.getId(),
                savedEntity.getTitle(),
                savedEntity.getDescription(),
                savedEntity.getStatus(),
                savedEntity.getPriority(),
                savedEntity.getDueDate(),
                savedEntity.getCreatedAt()
        );
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
        return new TaskDto(updated.getId(), updated.getTitle(), updated.getDescription(),
                updated.getStatus(), updated.getPriority(), updated.getDueDate(), updated.getCreatedAt());
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}