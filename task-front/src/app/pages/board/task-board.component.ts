import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, TaskComponent, ReactiveFormsModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  showModal = false;
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['MEDIUM'],
      status: ['TODO'],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.taskService.findAll().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this.taskService.create(this.taskForm.value).subscribe(() => {
        this.showModal = false;
        this.taskForm.reset({ priority: 'MEDIUM', status: 'TODO' });
        this.findAll(); 
      });
    }
  }

  filterByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}