import type { TaskPriority } from '@/types/task-priority.type';

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  deadline: string;
  completed: boolean;
  createdAt: string;
}
