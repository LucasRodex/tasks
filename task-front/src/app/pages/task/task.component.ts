import { Component, Input } from '@angular/core';
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
  

  
  labels: any = {
    'LOW': 'Prioridade Baixa',
    'MEDIUM': 'Prioridade Média',
    'HIGH': 'Prioridade Alta',
    
  };
  
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'HIGH': return '#ef5350';   
      case 'MEDIUM': return '#ffa726';
      case 'LOW': return '#66bb6a';    
      default: return '#bdbdbd';       
    }
}

}
