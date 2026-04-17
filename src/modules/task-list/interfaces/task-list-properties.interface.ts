import type { Task } from '@/interfaces/task.interface';
import { Events } from '@/enums/events.enum';

export interface TaskListProperties {
  tasks: Task[];
  emptyText: string;
  variant: Events.FULL | Events.COMPACT;
}
