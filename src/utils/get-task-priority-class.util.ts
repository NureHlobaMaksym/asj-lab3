import type { TaskPriority } from '@/types/task-priority.type';

const PRIORITY_CLASS_MAP: Record<TaskPriority, string> = {
  'Високий': 'task-item__badge--high',
  'Середній': 'task-item__badge--medium',
  'Низький': 'task-item__badge--low'
};

export const getTaskPriorityClass = (priority: TaskPriority): string => {
  return PRIORITY_CLASS_MAP[priority];
};
