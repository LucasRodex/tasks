import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);

  }
  create(task: Task): Observable<Task> {
  return this.http.post<Task>(this.apiUrl, task);
}
}
