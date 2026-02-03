package com.lucasrodex.task_back.repository;

import com.lucasrodex.task_back.enums.TaskStatus;
import com.lucasrodex.task_back.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);


}
