import { Events } from '@/enums/events.enum';

export interface TaskFormEmits {
  (event: Events.SUBMIT): void;
  (event: Events.CANCEL): void;
  (event: Events.UPDATE_TITLE, value: string): void;
  (event: Events.UPDATE_DESCRIPTION, value: string): void;
  (event: Events.UPDATE_CATEGORY, value: string): void;
  (event: Events.UPDATE_PRIORITY, value: string): void;
  (event: Events.UPDATE_DEADLINE, value: string): void;
  (event: Events.UPDATE_COMPLETED, value: boolean): void;
}
