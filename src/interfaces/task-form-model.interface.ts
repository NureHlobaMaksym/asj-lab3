import type { TaskPriority } from '@/types/task-priority.type';

export interface TaskFormModel {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  deadline: string;
  completed: boolean;
}
