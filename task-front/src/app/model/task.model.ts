export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: 'TODO' | 'DOING' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: Date;
}
