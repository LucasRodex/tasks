import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task.model';
import { TaskComponent } from '../task/task.component';


@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    ReactiveFormsModule,
    DragDropModule
  ],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  showModal = false;
  editingTask: Task | null = null;

  taskForm!: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadTasks();
  }

  

 private createForm(): void {
  this.taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(40)]],
    description: ['', [Validators.required, Validators.maxLength(200)]], 
    priority: ['MEDIUM'],
    status: ['TODO'],
    dueDate: ['', [Validators.required, this.futureDateValidator]]
  });
}
  
futureDateValidator(control: any) {
  if (!control.value) return null;
  const todayStr = new Date().toLocaleDateString('en-CA'); 
  const selectedDate = control.value; 
  return selectedDate >= todayStr ? null : { pastDate: true };
}
  loadTasks(): void {
    this.taskService.findAll().subscribe(tasks => {
      this.todoTasks = tasks.filter(task => task.status === 'TODO');
      this.doingTasks = tasks.filter(task => task.status === 'DOING');
      this.doneTasks = tasks.filter(task => task.status === 'DONE');
    });
  }

  openNewTask(): void {
    this.editingTask = null;
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'MEDIUM',
      status: 'TODO',
      dueDate: ''
    });
    this.showModal = true;
  }

editTask(task: Task): void {
  this.editingTask = task;
  this.showModal = true;

  
  this.taskForm.patchValue({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    status: task.status
  });
}


  saveTask(): void {
    if (this.taskForm.invalid) return;

    const taskData: Task = {
      ...this.editingTask,
      ...this.taskForm.value
    };

    const request$ = this.editingTask?.id
      ? this.taskService.update(this.editingTask.id, taskData)
      : this.taskService.create(taskData);

    request$.subscribe(() => {
      this.resetForm();
      this.loadTasks();
    });
  }

  deleteTask(task: Task): void {
    if (!task.id) return;

    if (!confirm('Deseja realmente excluir esta tarefa?')) return;

    this.taskService.delete(task.id).subscribe(() => {
      this.loadTasks();
    });
  }

  drop(
    event: CdkDragDrop<Task[]>,
    newStatus: 'TODO' | 'DOING' | 'DONE'
  ): void {

    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const movedTask = event.container.data[event.currentIndex];
    movedTask.status = newStatus;

    if (movedTask.id) {
      this.taskService.update(movedTask.id, movedTask).subscribe();
    }
  }

  resetForm(): void {
    this.showModal = false;
    this.editingTask = null;
    this.taskForm.reset({
      priority: 'MEDIUM',
      status: 'TODO'
    });
  }


todayDate: string = new Date().toLocaleDateString('en-CA');

}
