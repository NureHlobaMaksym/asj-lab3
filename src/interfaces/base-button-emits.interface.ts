import { Events } from '@/enums/events.enum';

export interface BaseButtonEmits {
  (event: Events.CLICK): void;
}
