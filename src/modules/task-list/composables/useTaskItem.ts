import type { Task } from '@/interfaces/task.interface';
import type { TaskPriority } from '@/types/task-priority.type';
import { formatShortDate } from '@/utils/format-short-date.util';
import { getTaskCategoryClass } from '@/utils/get-task-category-class.util';
import { getTaskDeadlineColorClass } from '@/utils/get-task-deadline-color-class.util';
import { getTaskPriorityClass } from '@/utils/get-task-priority-class.util';
import { isTaskOverdue } from '@/utils/is-task-overdue.util';

export const useTaskItem = () => {
  const isOverdue = (task: Task): boolean => {
    return isTaskOverdue(task);
  };

  const getDeadlineColorClass = (task: Task): string => {
    return getTaskDeadlineColorClass(task);
  };

  const getPriorityClass = (priority: TaskPriority): string => {
    return getTaskPriorityClass(priority);
  };

  const getCategoryClass = (category: string): string => {
    return getTaskCategoryClass(category);
  };

  return {
    isOverdue,
    getDeadlineColorClass,
    getPriorityClass,
    formatShortDate,
    getCategoryClass
  };
};
