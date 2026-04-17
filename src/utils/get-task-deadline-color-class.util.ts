import type { Task } from '@/interfaces/task.interface';
import { getDaysDifference } from '@/utils/get-days-difference.util';

export const getTaskDeadlineColorClass = (task: Task): string => {
  if (task.completed) {
    return 'stats-list__date--normal';
  }

  const daysDifference = getDaysDifference(task.deadline);
  if (daysDifference <= 0) {
    return 'stats-list__date--overdue';
  }

  if (daysDifference === 1) {
    return 'stats-list__date--soon';
  }

  return 'stats-list__date--normal';
};
