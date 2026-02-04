package com.lucasrodex.task_back.controller;

import com.lucasrodex.task_back.dto.TaskDto;
import com.lucasrodex.task_back.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

   @Autowired
   private TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto create(@RequestBody TaskDto taskDto) {
        return taskService.create(taskDto);
    }

    @PutMapping("/{id}")
    public TaskDto update(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        return taskService.update(id, taskDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> listAll() {
        return ResponseEntity.ok(taskService.findAll());
    }
}



