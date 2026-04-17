import type { SelectOption } from '@/interfaces/select-option.interface';

export interface BaseFiltersProperties {
  categoryValue: string;
  priorityValue: string;
  sortValue: string;
  categoryOptions: SelectOption[];
  priorityOptions: SelectOption[];
  sortOptions: SelectOption[];
}
