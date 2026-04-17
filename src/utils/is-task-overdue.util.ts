import type { Task } from '@/interfaces/task.interface';
import { getTodayTimestamp } from '@/utils/get-today-timestamp.util';
import { parseDate } from '@/utils/parse-date.util';

export const isTaskOverdue = (task: Task): boolean => {
  return !task.completed && parseDate(task.deadline) < getTodayTimestamp();
};
