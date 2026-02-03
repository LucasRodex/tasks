import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../model/task.model';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, TaskComponent, ReactiveFormsModule, DragDropModule],
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

drop(event: CdkDragDrop<Task[]>, newStatus: string): void {
  if (event.previousContainer === event.container) {
    return;
  }

  const task = event.item.data as Task;
  
 
  task.status = newStatus as "TODO" | "DOING" | "DONE";

  if (task.id) {
      this.taskService.update(task.id, task).subscribe({
         
      });
  }
}


}