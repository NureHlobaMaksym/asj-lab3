import { Events } from '@/enums/events.enum';

export interface BaseInputEmits {
  (event: Events.UPDATE_MODEL_VALUE, value: string): void;
}
