import { Events } from '@/enums/events.enum';

export interface BaseFiltersEmits {
  (event: Events.UPDATE_CATEGORY_VALUE, value: string): void;
  (event: Events.UPDATE_PRIORITY_VALUE, value: string): void;
  (event: Events.UPDATE_SORT_VALUE, value: string): void;
}
