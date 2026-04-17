import type { Task } from '@/interfaces/task.interface';
import { Events } from '@/enums/events.enum';

export interface TaskItemProperties {
  task: Task;
  variant: Events.FULL | Events.COMPACT;
}
