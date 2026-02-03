import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  priorityLabel: Record<Task['priority'], string> = {
    LOW: 'Prioridade baixa',
    MEDIUM: 'Prioridade média',
    HIGH: 'Prioridade alta'
  };

  getPriorityColor(): string {
    switch (this.task.priority) {
      case 'HIGH':
        return '#ef5350';
      case 'MEDIUM':
        return '#ffa726';
      case 'LOW':
        return '#66bb6a';
      default:
        return '#bdbdbd';
    }
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.remove.emit(this.task);
  }
}
